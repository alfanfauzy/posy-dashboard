import type {FC, DragEvent} from 'react';

type TableProps = {
	data: any;
	id: string;
};

export const Table: FC<TableProps> = ({data, id}) => {
	const drag = (e: DragEvent<HTMLDivElement> | any) => {
		e.dataTransfer.setData('text', e.target.id);
	};

	return (
		<div
			id={id}
			draggable
			onDragStart={drag}
			className="cursor-move text-red-caution"
		>
			{data.name}
		</div>
	);
};
