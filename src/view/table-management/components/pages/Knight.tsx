import type {CSSProperties, FC} from 'react';
// import {DragPreviewImage, useDrag} from 'react-dnd';

import {ItemTypes} from './ItemTypes';
import {knightImage} from './KnightImage';

const knightStyle: CSSProperties = {
	fontSize: 40,
	fontWeight: 'bold',
	cursor: 'move',
};

type KnightProps = {
	id: string;
};

export const Knight: FC<KnightProps> = ({id}) => {
	// const [{isDragging}, drag, preview] = useDrag(
	// 	() => ({
	// 		type: ItemTypes.KNIGHT,
	// 		collect: monitor => ({
	// 			isDragging: !!monitor.isDragging(),
	// 		}),
	// 	}),
	// 	[],
	// );

	function drag(e: any) {
		e.dataTransfer.setData('text', e.target.id);
		console.log(e.target, 'drag');
	}

	return (
		<>
			{/* <DragPreviewImage connect={preview} src={knightImage} /> */}
			<div
				id={id}
				draggable
				onDragStart={drag}
				style={{
					...knightStyle,
					// opacity: isDragging ? 0.5 : 1,
				}}
			>
				♘
			</div>
		</>
	);
};
