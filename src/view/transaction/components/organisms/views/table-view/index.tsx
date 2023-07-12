import {mapToTableLayoutModel} from '@/data/table/mappers/TableMapper';
import {Area, Areas} from '@/domain/area/model';
import {TableLayout} from '@/domain/table/model/TableLayout';
import {useAppSelector} from '@/view/common/store/hooks';
import FloorList from '@/view/table-management/components/molecules/floor-list';
import {useGetTableLayoutByFloorViewModel} from '@/view/table-management/view-models/GetTableLayoutByFloorViewModel';
import Image from 'next/image';
import React, {useState} from 'react';

type TableViewProps = {
	dataArea: Areas | undefined;
	selectedArea: Area | undefined;
	onChangeSelectArea: (val: Area) => void;
};

const TableView = ({
	dataArea,
	selectedArea,
	onChangeSelectArea,
}: TableViewProps) => {
	const {outletId} = useAppSelector(state => state.auth);
	const [table, setTablePos] = useState<TableLayout>([]);

	const {data: dataTable, isLoading: loadTable} =
		useGetTableLayoutByFloorViewModel(
			{
				restaurant_outlet_uuid: outletId,
				area_uuid: selectedArea?.uuid || '',
			},
			{
				enabled: !!selectedArea?.uuid,
				onSuccess: _data => {
					if (_data) {
						const mappedData = mapToTableLayoutModel(_data.data);
						setTablePos(mappedData);
					}
				},
			},
		);

	if (dataArea && dataTable && table && selectedArea) {
		const renderSquare = (i: number) => {
			const toY = i % selectedArea.width;
			const toX = Math.floor(i / selectedArea.width);

			console.log(table);

			return (
				<div
					id={`${toX},${toY}`}
					className="lg:w-[90px] w-[72px] lg:h-[90px] h-[72px] aspect-square border-[0.5px] border-neutral-40"
				>
					<div className="w-full h-full flex items-center justify-center">
						<div>
							<div className="relative flex h-full justify-center items-center py-1 px-2.5">
								<Image
									width={60}
									height={60}
									src="https://ik.imagekit.io/posyfnb/table_2.png"
									alt="table"
								/>
								<p className="absolute text-l-regular text-neutral-70">
									{table[toX][toY]?.table_number}
								</p>
							</div>
						</div>
					</div>
				</div>
			);
		};

		return (
			<main>
				<section className="flex">
					<div className="bg-[#F7F7F7] h-fit w-fit p-2 mt-4">
						<div
							className={`w-fit h-fit border-[0.5px] border-neutral-40 grid grid-cols-${selectedArea.width} `}
						>
							{new Array(selectedArea.height * selectedArea.width)
								.fill(0)
								.map((_, i) => renderSquare(i))}
						</div>
					</div>
				</section>
				<FloorList
					dataArea={dataArea}
					selectedArea={selectedArea}
					onChangeSelectArea={onChangeSelectArea}
				/>
			</main>
		);
	}

	return <div />;
};

export default TableView;
