/* eslint-disable react-hooks/exhaustive-deps */
import type {DragEvent, FC} from 'react';
import {useState} from 'react';

import {BoardSquare} from './BoardSquare';
import type {Game, Position} from './Game';
import {Piece} from './Piece';

export type BoardProps = {
	game: Game;
};

/** Styling properties applied to the board element */
// const boardStyle: CSSProperties = {
// 	width: '100%',
// 	height: '100%',
// 	display: 'flex',
// 	flexWrap: 'wrap',
// };
/** Styling properties applied to each square element */
// const squareStyle: CSSProperties = {width: '12.5%', height: '12.5%'};

/**
 * The chessboard component
 * @param props The react props
 */
const squares = {
	layout: {
		type: 'GRID',
		width: 7,
		height: 7,
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
		],
		[
			null,
			null,
			{id: 3, name: 'Table 3'},
			{id: 4, name: 'Table 4'},
			null,
			null,
			null,
		],
		[null, null, null, null, null, null, null],
		[
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
			{id: 5, name: 'Table 5'},
			{id: 6, name: 'Table 6'},
		],
		[
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
			{id: 5, name: 'Table 5'},
			{id: 6, name: 'Table 6'},
		],
		// [
		// 	null,
		// 	null,
		// 	null,
		// 	null,
		// 	null,
		// 	{id: 5, name: 'Table 5'},
		// 	{id: 6, name: 'Table 6'},
		// ],
		// [
		// 	null,
		// 	null,
		// 	null,
		// 	null,
		// 	null,
		// 	{id: 5, name: 'Table 5'},
		// 	{id: 6, name: 'Table 6'},
		// ],
	],
};

export const Board: FC<BoardProps> = () => {
	const [knight, setKnightPos] = useState<Position>(squares.objs);

	function renderSquare(i: number) {
		const toY = i % squares.layout.width;
		const toX = Math.floor(i / squares.layout.height);

		console.log(knight[toX][toY], toX, toY);

		function allowDrop(e: DragEvent<HTMLDivElement>) {
			e.preventDefault();
		}

		function drop(e: any) {
			e.preventDefault();
			const data = e.dataTransfer.getData('text');
			const nodeCopy: any = document.getElementById(data)?.cloneNode(true);
			const [x, y] = e.target.id.split(',');
			const [fromX, fromY] = nodeCopy.id.split(',');
			const newknight = [...knight];

			newknight[x][y] = {id: 99, name: 'knight'};
			newknight[fromX][fromY] = null;
			setKnightPos(newknight);

			// const source = tempArray[idx];
		}

		return (
			<div
				id={`${toX},${toY}`}
				onDrop={drop}
				onDragOver={allowDrop}
				className="w-[70px] h-[70px]"
			>
				{/* <BoardSquare
					toX={toX}
					toY={toY}
					fromX={toX}
					fromY={toY}
					tempArray={tempArr}
					game={game}
					idx={i}
				> */}
				{knight[toX][toY] && (
					<div className="w-full h-full flex items-center justify-center">
						<div>
							<Piece id={`${toX},${toY}`} isKnight />
						</div>
					</div>
				)}
				{/* </BoardSquare> */}
			</div>
		);
	}

	return (
		<div
			className={`w-fit mt-16 h-fit grid grid-cols-${squares.layout.width} bg-slate-600`}
		>
			{/* {squares.objs.map((row, x) =>
				row.map((col, y) => renderSquare(x, y, squares.objs, col)),
			)} */}
			{new Array(squares.layout.height * squares.layout.width)
				.fill(0)
				.map((_, i) => renderSquare(i))}
		</div>
	);
};
