/* eslint-disable react-hooks/exhaustive-deps */
import type {DragEvent} from 'react';
import {useState} from 'react';

import {Table} from './Table';

const squares = {
	layout: {
		type: 'GRID',
		width: 8,
		height: 6,
	},
	objs: [
		[
			{id: 1, name: 'Table 1'},
			{id: 2, name: 'Table 2'},
			null,
			null,
			null,
			null,
			null,
			null,
		],
		[
			null,
			null,
			{id: 3, name: 'Table 3'},
			{id: 4, name: 'Table 4'},
			null,
			null,
			null,
			null,
		],
		[null, null, null, null, null, null, null, null],
		[
			null,
			null,
			null,
			null,
			null,
			null,
			{id: 5, name: 'Table 5'},
			{id: 6, name: 'Table 6'},
		],
		[
			null,
			null,
			null,
			null,
			null,
			null,
			{id: 5, name: 'Table 7'},
			{id: 6, name: 'Table 8'},
		],
		[
			null,
			null,
			null,
			null,
			null,
			null,
			{id: 5, name: 'Table 9'},
			{id: 6, name: 'Table 10'},
		],
		// [
		// 	null,
		// 	null,
		// 	null,
		// 	null,
		// 	null,
		// 	null,
		// 	{id: 5, name: 'Table 11'},
		// 	{id: 6, name: 'Table 12'},
		// ],
		// [
		// 	null,
		// 	null,
		// 	null,
		// 	null,
		// 	null,
		// 	null,
		// 	{id: 5, name: 'Table 13'},
		// 	{id: 6, name: 'Table 14'},
		// ],
		// [
		// 	null,
		// 	null,
		// 	null,
		// 	null,
		// 	null,
		// 	null,
		// 	{id: 5, name: 'Table 15'},
		// 	{id: 6, name: 'Table 16'},
		// ],
	],
};

export type Position = Array<
	Array<{
		id: number;
		name: string;
	} | null>
>;

export const Board = () => {
	const [table, setTablePos] = useState<Position>(squares.objs);

	const renderSquare = (i: number) => {
		const toY = i % squares.layout.width;
		const toX = Math.floor(i / squares.layout.width);

		// console.log(squares.layout.width, squares.layout.height, i, 'layout');

		console.log(toX, 'x', toY, 'y');

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
				onDrop={drop}
				onDragOver={allowDrop}
				className="w-[70px] h-[70px] aspect-square border-[0.5px] border-black"
			>
				{table[toX][toY] && (
					<div className="w-full h-full flex items-center justify-center">
						<Table data={table[toX][toY]} id={`${toX},${toY}`} />
					</div>
				)}
			</div>
		);
	};

	console.log(table);
	return (
		<section className="bg-slate-300 w-full overflow-auto">
			<div
				className={`w-fit mt-16 h-fit grid border-[0.5px] border-black grid-cols-${squares.layout.width} `}
			>
				{new Array(squares.layout.height * squares.layout.width)
					.fill(0)
					.map((_, i) => renderSquare(i))}
			</div>
		</section>
	);
};
