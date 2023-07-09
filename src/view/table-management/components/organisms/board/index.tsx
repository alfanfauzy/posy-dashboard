import {Area} from '@/domain/area/model';
import {TableLayout} from '@/domain/table/model/TableLayout';
import useDisclosure from '@/view/common/hooks/useDisclosure';
import useViewportListener from '@/view/common/hooks/useViewportListener';
import {useAppDispatch} from '@/view/common/store/hooks';
import {setOpenDrawer} from '@/view/common/store/slices/auth';
import Table from '@/view/table-management/components/molecules/table';
import dynamic from 'next/dynamic';
import {Button} from 'posy-fnb-core';
import type {DragEvent} from 'react';
import {AiOutlinePlusCircle} from 'react-icons/ai';
import {BsList} from 'react-icons/bs';

import {type TableProps} from '../modal/AddTableModal';

const AddTableModal = dynamic(() => import('../modal/AddTableModal'), {
	loading: () => <div />,
});

type BoardProps = {
	isEditLayout: boolean;
	openEditLayout: () => void;
	closeEditLayout: () => void;
	dataArea: Pick<Area, 'height' | 'width'>;
	table: TableLayout;
	setTablePos: (val: TableLayout) => void;
};

const Board = ({
	isEditLayout,
	closeEditLayout,
	openEditLayout,
	table,
	dataArea,
	setTablePos,
}: BoardProps) => {
	const dispatch = useAppDispatch();
	const {width} = useViewportListener();

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

	const renderSquare = (i: number) => {
		const toY = i % dataArea.width;
		const toX = Math.floor(i / dataArea.width);

		const onOpenAddTable = () => {
			openAddTable();
			setValueAddTable({
				position_x: toX,
				position_y: toY,
				floor_area_uuid: 'ca73e64b-f3be-40e8-a386-90b7094abd81',
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
				className="lg:w-[90px] w-[72px] lg:h-[90px] h-[72px] aspect-square border-[0.5px] border-neutral-40"
			>
				{table[toX][toY] && (
					<div className="w-full h-full flex items-center justify-center">
						<Table
							data={table[toX][toY]}
							id={`${toX},${toY}`}
							isEditLayout={isEditLayout}
						/>
					</div>
				)}

				{!isEditLayout && !table[toX][toY] && (
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

			<section className="h-full overflow-y-hidden overflow-auto p-4 xl:rounded-r-lg rounded-lg bg-neutral-10">
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
						{!isEditLayout ? (
							<p
								onClick={openEditLayout}
								className="text-m-medium text-neutral-100 cursor-pointer hover:opacity-70 duration-300 ease-in-out"
							>
								Edit Layout
							</p>
						) : (
							<Button size="m" onClick={closeEditLayout}>
								Save
							</Button>
						)}
					</div>
				</aside>
				<aside className="flex">
					<div className="bg-[#F7F7F7] h-fit w-fit p-2 mt-4">
						<div
							className={`w-fit h-fit border-[0.5px] border-neutral-40 grid grid-cols-${dataArea.width} `}
						>
							{new Array(dataArea.height * dataArea.width)
								.fill(0)
								.map((_, i) => renderSquare(i))}
						</div>
					</div>
				</aside>
			</section>
		</>
	);
};

export default Board;
