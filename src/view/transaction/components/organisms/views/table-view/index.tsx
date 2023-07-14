/* eslint-disable @typescript-eslint/no-shadow */
import {mapToTableLayoutModel} from '@/data/table/mappers/TableMapper';
import {Area, Areas} from '@/domain/area/model';
import {Table} from '@/domain/table/model';
import {TableLayout} from '@/domain/table/model/TableLayout';
import useClickOutside from '@/view/common/hooks/useClickOutside';
import useDisclosure from '@/view/common/hooks/useDisclosure';
import {useAppDispatch, useAppSelector} from '@/view/common/store/hooks';
import {onChangeSelectedTrxId} from '@/view/common/store/slices/transaction';
import FloorList from '@/view/table-management/components/molecules/floor-list';
import {useGetTableLayoutByFloorViewModel} from '@/view/table-management/view-models/GetTableLayoutByFloorViewModel';
import {Popover} from 'antd';
import Image from 'next/image';
import {Loading} from 'posy-fnb-core';
import React, {useRef, useState} from 'react';

import CreateTransactionFromTableModal from '../../modal/CreateTransactionFromTableModal';

const MenuPopover = (
	item: Table,
	openCreateTransaction: () => void,
	closePopOver: () => void,
) => {
	const dispatch = useAppDispatch();

	return (
		<div className="flex flex-col gap-4">
			<p
				onClick={() => {
					openCreateTransaction();
					closePopOver();
				}}
				className="hover:text-primary-main cursor-pointer"
			>
				+ Create new trx
			</p>
			{item?.transactions?.map(el => (
				<p
					key={el.uuid}
					onClick={() => {
						dispatch(
							onChangeSelectedTrxId({
								id: el.uuid,
							}),
						);
						closePopOver();
					}}
					className="hover:text-primary-main cursor-pointer"
				>
					{el.session_suffix}
				</p>
			))}
		</div>
	);
};

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
	const [isOpenPopover, {open: openPopover, close: closePopOver}] =
		useDisclosure({
			initialState: false,
		});
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const tableRef = useRef<any>();
	useClickOutside({
		ref: tableRef,
		handleClick: closePopOver,
	});

	const [
		isOpenCreateTransaction,
		{open: openCreateTransaction, close: closeCreateTransaction},
		{valueState: selectedTable, setValueState: setSelectedTable},
	] = useDisclosure<Table>({
		initialState: false,
	});

	const {data: dataTable, isLoading: loadTable} =
		useGetTableLayoutByFloorViewModel(
			{
				restaurant_outlet_uuid: outletId,
				area_uuid: selectedArea?.uuid || '',
				show_active_transaction: true,
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

	const handleSelectTable = (itemTable: Table) => {
		if (itemTable?.transactions && itemTable?.transactions?.length >= 1) {
			openPopover();
			setSelectedTable(itemTable);
		} else {
			openCreateTransaction();
			setSelectedTable(itemTable);
		}
	};

	if (loadTable) {
		return (
			<div className="h-full flex justify-center items-center">
				<Loading size={80} />
			</div>
		);
	}

	if (dataArea && dataTable && table && selectedArea) {
		const RenderSquare = (
			i: number,
			openCreateTransaction: () => void,
			closePopOver: () => void,
		) => {
			const toY = i % selectedArea.width;
			const toX = Math.floor(i / selectedArea.width);

			const item = table?.[toX]?.[toY];

			const showPopOverDrowdown =
				(item?.transactions &&
					item?.transactions?.length >= 1 &&
					isOpenPopover &&
					item.uuid === selectedTable?.uuid) ??
				false;

			if (item?.uuid) {
				return (
					<div
						ref={tableRef}
						id={`${toX},${toY}`}
						className="lg:w-[90px] w-[72px] lg:h-[90px] h-[72px] aspect-square"
						onClick={() => handleSelectTable(item)}
					>
						<div className="w-full h-full flex items-center justify-center">
							<Popover
								content={() =>
									MenuPopover(item, openCreateTransaction, closePopOver)
								}
								open={showPopOverDrowdown}
								placement="bottom"
							>
								<div className="relative flex justify-center items-center py-1 px-2.5  cursor-pointer">
									<Image
										width={60}
										height={60}
										src={item.table_image}
										alt="table"
									/>
									<p className="absolute text-l-regular text-neutral-70">
										{item?.uuid ? item?.table_number : null}
									</p>
									{item.transactions && item.transactions?.length > 0 ? (
										<div className="top-1 right-2 absolute w-5 h-5 flex items-center text-xs justify-center bg-secondary-main rounded-full text-white">
											{item.transactions?.length}
										</div>
									) : null}
								</div>
							</Popover>
						</div>
					</div>
				);
			}

			return <div />;
		};

		return (
			<main>
				{selectedTable && (
					<CreateTransactionFromTableModal
						open={isOpenCreateTransaction}
						handleClose={closeCreateTransaction}
						dataTable={selectedTable}
					/>
				)}
				<section className="flex">
					<div className="bg-[#F7F7F7] h-fit w-fit p-2 mt-4 rounded-lg">
						<div
							className={`w-fit h-fit grid grid-cols-${selectedArea.width} `}
						>
							{new Array(selectedArea.height * selectedArea.width)
								.fill(0)
								.map((_, i) =>
									RenderSquare(i, openCreateTransaction, closePopOver),
								)}
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
