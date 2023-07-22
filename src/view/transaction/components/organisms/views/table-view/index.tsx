/* eslint-disable @typescript-eslint/no-shadow */
import {mapToTableLayoutModel} from '@/data/table/mappers/TableMapper';
import {Area} from '@/domain/area/model';
import {Table} from '@/domain/table/model';
import {TableLayout} from '@/domain/table/model/TableLayout';
import useClickOutside from '@/view/common/hooks/useClickOutside';
import useDisclosure from '@/view/common/hooks/useDisclosure';
import useViewportListener from '@/view/common/hooks/useViewportListener';
import {useAppDispatch, useAppSelector} from '@/view/common/store/hooks';
import {
	onChangeIsOpenEditTransactionFromTableView,
	onChangeSelectedTable,
} from '@/view/common/store/slices/transaction';
import {useGetTableLayoutByFloorViewModel} from '@/view/table-management/view-models/GetTableLayoutByFloorViewModel';
import {Popover} from 'antd';
import Image from 'next/image';
import {Loading} from 'posy-fnb-core';
import React, {useRef, useState} from 'react';

import EmptyArea from '../../../molecules/empty-state/empty-area';
import TableViewPopover from '../../../molecules/table-view-popover';
import CreateTransactionFromTableModal from '../../modal/CreateTransactionFromTableModal';

const TableView = () => {
	const dispatch = useAppDispatch();
	const {width} = useViewportListener();
	const {outletId} = useAppSelector(state => state.auth);
	const {selectedArea, selectedTable} = useAppSelector(
		state => state.transaction,
	);
	const [table, setTablePos] = useState<TableLayout>([]);

	const [isOpenPopover, {open: openPopover, close: closePopOver}] =
		useDisclosure({
			initialState: false,
		});

	const tableRef =
		useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
	useClickOutside({
		ref: tableRef,
		handleClick: closePopOver,
	});

	const {isLoading: loadTable} = useGetTableLayoutByFloorViewModel(
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
			dispatch(
				onChangeSelectedTable({
					prevTable: selectedTable,
					table: itemTable,
				}),
			);
		} else {
			dispatch(onChangeIsOpenEditTransactionFromTableView(true));
			dispatch(
				onChangeSelectedTable({
					prevTable: selectedTable,
					table: itemTable,
				}),
			);
		}
	};

	const RenderSquare = (
		i: number,
		closePopOver: () => void,
		selectedArea: Area,
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
					id={`${toX},${toY}`}
					className="lg:py-4 py-1"
					onClick={() => handleSelectTable(item)}
				>
					<div className="w-full h-full flex items-center justify-center">
						<Popover
							content={() => TableViewPopover(item, closePopOver)}
							open={showPopOverDrowdown}
							placement="bottom"
						>
							<div className="relative flex justify-center items-center py-1 px-2.5 cursor-pointer">
								<Image
									width={width > 1000 ? 65 : 55}
									height={width > 1000 ? 65 : 55}
									src={item.table_image}
									alt="table"
								/>
								<p className="absolute text-s-regular lg:text-l-regular text-neutral-70">
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

	if (loadTable && selectedArea?.uuid) {
		return (
			<div className="h-full flex justify-center items-center">
				<Loading size={80} />
			</div>
		);
	}

	if (!selectedArea) {
		return <EmptyArea redirect />;
	}

	return (
		<main className="overflow-auto">
			<CreateTransactionFromTableModal />

			<section>
				<div ref={tableRef} className="bg-[#F7F7F7] p-1 rounded-lg">
					<div className={`w-full h-fit grid grid-cols-${selectedArea.width} `}>
						{new Array(selectedArea.height * selectedArea.width)
							.fill(0)
							.map((_, i) => RenderSquare(i, closePopOver, selectedArea))}
					</div>
				</div>
			</section>
		</main>
	);
};

export default TableView;
