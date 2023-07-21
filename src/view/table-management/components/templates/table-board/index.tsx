import {Area, Areas} from '@/domain/area/model';
import {type Table as TableType} from '@/domain/table/model';
import {TableLayout} from '@/domain/table/model/TableLayout';
import AreaIcon from '@/view/common/assets/icons/area';
import useDisclosure from '@/view/common/hooks/useDisclosure';
import useViewportListener from '@/view/common/hooks/useViewportListener';
import {useAppDispatch, useAppSelector} from '@/view/common/store/hooks';
import {setOpenDrawer} from '@/view/common/store/slices/auth';
import Table from '@/view/table-management/components/molecules/table';
import {useUpdateSaveTableLayoutViewModel} from '@/view/table-management/view-models/UpdateSaveTableLayoutViewModel';
import dynamic from 'next/dynamic';
import {useRouter} from 'next/router';
import {Button} from 'posy-fnb-core';
import type {DragEvent} from 'react';
import {AiOutlinePlusCircle} from 'react-icons/ai';
import {BsList} from 'react-icons/bs';

import FloorList from '../../molecules/floor-list';
import {type TableProps} from '../../organisms/modal/AddTableModal';

const AddTableModal = dynamic(
	() => import('../../organisms/modal/AddTableModal'),
	{
		loading: () => <div />,
	},
);

type TableBoardProps = {
	isEditLayout: boolean;
	openEditLayout: () => void;
	closeEditLayout: () => void;
	dataArea: Pick<Area, 'height' | 'width'>;
	table: TableLayout;
	setTablePos: (val: TableLayout) => void;
	onChangeSelectedArea: (val: Area) => void;
	selectedArea: Area | undefined;
	areaList: Areas;
	selectedTable: TableType | null;
	onChangeSelectedTable: (val: TableType) => void;
};

const TableBoard = ({
	isEditLayout,
	closeEditLayout,
	openEditLayout,
	table,
	dataArea,
	setTablePos,
	areaList,
	selectedArea,
	onChangeSelectedArea,
	onChangeSelectedTable,
}: TableBoardProps) => {
	const {push} = useRouter();
	const dispatch = useAppDispatch();
	const {width} = useViewportListener();
	const {outletId} = useAppSelector(state => state.auth);

	const [
		isOpenAddTable,
		{open: openAddTable, close: closeAddTable},
		{valueState: valueAddTable, setValueState: setValueAddTable},
	] = useDisclosure<TableProps>({initialState: false});

	const onCloseAddTable = () => {
		closeAddTable();
		setValueAddTable({
			position_x: 0,
			position_y: 0,
			floor_area_uuid: '',
		});
	};

	const {UpdateSaveTableLayout, isLoading} = useUpdateSaveTableLayoutViewModel({
		onSuccess: () => {
			closeEditLayout();
		},
	});

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		UpdateSaveTableLayout({
			floor_area_uuid: selectedArea?.uuid || '',
			restaurant_outlet_uuid: outletId,
			layout: table,
		});
	};

	const renderSquare = (i: number) => {
		const toY = i % dataArea.width;
		const toX = Math.floor(i / dataArea.width);

		const item = table?.[toX]?.[toY];

		const onOpenAddTable = () => {
			openAddTable();
			setValueAddTable({
				position_x: toX,
				position_y: toY,
				floor_area_uuid: selectedArea?.uuid || '',
			});
		};

		const allowDrop = (e: DragEvent<HTMLDivElement>) => {
			e.preventDefault();
		};

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const drop = (e: DragEvent<HTMLDivElement> | any) => {
			e.preventDefault();
			const data = e.dataTransfer.getData('text');
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const nodeCopy = document.getElementById(data)?.cloneNode(true) as any;
			const [x, y] = e.target.id.split(',');
			const [fromX, fromY] = nodeCopy.id.split(',');

			if ((!x && !y) || (x === fromX && y === fromY)) {
				return;
			} else {
				const newTable = [...table];
				const filteredTable = newTable[fromX][fromY];
				const swapTable = newTable[x][y];

				newTable[x][y] = filteredTable;
				if (swapTable) newTable[fromX][fromY] = swapTable;
				else newTable[fromX][fromY] = null;

				setTablePos(newTable);
			}
		};

		return (
			<div
				id={`${toX},${toY}`}
				onDrop={isEditLayout ? drop : () => undefined}
				onDragOver={isEditLayout ? allowDrop : () => undefined}
				className="aspect-square border-[0.5px] border-neutral-40"
			>
				{item?.uuid && (
					<div className="w-full h-full flex items-center justify-center">
						<Table
							data={item}
							id={`${toX},${toY}`}
							isEditLayout={isEditLayout}
							onChangeSelectedTable={onChangeSelectedTable}
						/>
					</div>
				)}

				{!isEditLayout && !item?.uuid && (
					<div className="h-full flex items-center justify-center">
						<AiOutlinePlusCircle
							size={22}
							className="text-neutral-50 hover:opacity-70 cursor-pointer"
							onClick={onOpenAddTable}
						/>
					</div>
				)}
			</div>
		);
	};

	return (
		<>
			{isOpenAddTable && valueAddTable && (
				<AddTableModal
					isOpen={isOpenAddTable}
					onClose={onCloseAddTable}
					tableProps={valueAddTable}
				/>
			)}

			<form
				onSubmit={handleSubmit}
				className="relative h-full flex-1 overflow-y-hidden overflow-x-hidden overflow-auto p-4 xl:rounded-r-lg rounded-lg bg-neutral-10"
			>
				<aside className="flex items-center gap-4">
					{width <= 1280 && (
						<BsList
							onClick={() => dispatch(setOpenDrawer(true))}
							size={24}
							className="cursor-pointer text-neutral-100 hover:opacity-70 duration-300 ease-in-out"
						/>
					)}
					<div className="flex w-full justify-between items-end">
						<p className="text-xxl-semibold text-neutral-100">Table Settings</p>
						{!isEditLayout && areaList.length > 0 && (
							<p
								onClick={openEditLayout}
								className="text-m-medium text-neutral-100 cursor-pointer hover:opacity-70 duration-300 ease-in-out"
							>
								Edit Layout
							</p>
						)}
						{isEditLayout && areaList.length > 0 && (
							<Button isLoading={isLoading} type="submit" size="m">
								Save
							</Button>
						)}
					</div>
				</aside>
				{areaList.length === 0 && (
					<div className="h-full flex flex-col justify-center items-center">
						<AreaIcon />
						<p
							onClick={() => push('/settings/area-management')}
							className="text-l-medium mt-4 cursor-pointer hover:text-secondary-main hover:opacity-70"
						>
							Please add new area first
						</p>
					</div>
				)}

				{areaList.length > 0 ? (
					<aside className="flex w-full h-full pb-20 overflow-y-auto">
						<div className="bg-[#F7F7F7] h-fit w-full p-2 mt-4">
							<div
								className={`w-full h-fit border-[0.5px] border-neutral-40 grid grid-cols-${dataArea.width} `}
							>
								{new Array(dataArea.height * dataArea.width)
									.fill(0)
									.map((_, i) => renderSquare(i))}
							</div>
						</div>
					</aside>
				) : null}
				<FloorList
					dataArea={areaList}
					selectedArea={selectedArea}
					onChangeSelectArea={onChangeSelectedArea}
				/>
			</form>
		</>
	);
};

export default TableBoard;
