import type {FC, ReactNode} from 'react';
import {useDrop} from 'react-dnd';

import type {Game} from './Game';
import {ItemTypes} from './ItemTypes';
import {Overlay, OverlayType} from './Overlay';
import {Square} from './Square';

export type BoardSquareProps = {
	toX: number;
	toY: number;
	fromX: number;
	fromY: number;
	game: Game;
	tempArray: Array<{x: number; y: number}>;
	idx: number;
	children: ReactNode;
};

export const BoardSquare: FC<BoardSquareProps> = ({
	toX,
	toY,
	fromX,
	fromY,
	game,
	children,
	tempArray,
	idx,
}: BoardSquareProps) => {
	const [_, drop] = useDrop(
		() => ({
			accept: ItemTypes.KNIGHT,
			canDrop: () => true,
			drop: () => game.moveKnight(toX, toY, fromX, fromY, tempArray, idx),
			// collect: monitor => ({
			// 	isOver: !!monitor.isOver(),
			// 	canDrop: !!monitor.canDrop(),
			// }),
		}),
		[game],
	);

	return (
		<div
			ref={drop}
			style={{
				position: 'relative',
				width: '100%',
				height: '100%',
			}}
		>
			<Square>{children}</Square>
			{/* {isOver && !canDrop && <Overlay type={OverlayType.IllegalMoveHover} />}
			{!isOver && canDrop && <Overlay type={OverlayType.PossibleMove} />}
			{isOver && canDrop && <Overlay type={OverlayType.LegalMoveHover} />} */}
		</div>
	);
};
