import {Area} from '@/domain/area/model';
import {TableLayout} from '@/domain/table/model/TableLayout';
import {useAppDispatch, useAppSelector} from '@/view/common/store/hooks';
import {onOpenAddTable} from '@/view/common/store/slices/table';
import React, {DragEvent} from 'react';
import {AiOutlinePlusCircle} from 'react-icons/ai';

import Table from '../../atoms/table';

type TableSquareProps = {
	index: number;
	tablePos: TableLayout;
	setTablePos: (tablePos: TableLayout) => void;
	selectedArea: Area;
};

const TableSquare = ({
	index,
	selectedArea,
	tablePos,
	setTablePos,
}: TableSquareProps) => {
	const dispatch = useAppDispatch();
	const {isEditLayout} = useAppSelector(state => state.table);

	const toY = index % selectedArea.width;
	const toX = Math.floor(index / selectedArea?.width);

	const item = tablePos?.[toX]?.[toY];

	const handleOpenAddTable = () => {
		dispatch(
			onOpenAddTable({
				position_x: toX,
				position_y: toY,
				floor_area_uuid: selectedArea.uuid,
			}),
		);
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
			const newTableLayout = [...tablePos];
			const filteredTable = newTableLayout[fromX][fromY];
			const swapTable = newTableLayout[x][y];

			newTableLayout[x][y] = filteredTable;

			if (swapTable) newTableLayout[fromX][fromY] = swapTable;
			else newTableLayout[fromX][fromY] = null;

			setTablePos(newTableLayout);
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
					<Table data={item} id={`${toX},${toY}`} />
				</div>
			)}

			{!isEditLayout && !item?.uuid && (
				<div className="h-full flex items-center justify-center">
					<AiOutlinePlusCircle
						size={22}
						className="text-neutral-50 hover:opacity-70 cursor-pointer"
						onClick={handleOpenAddTable}
					/>
				</div>
			)}
		</div>
	);
};

export default TableSquare;
