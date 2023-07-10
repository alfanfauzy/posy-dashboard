import {Table} from '@/domain/table/model';
import Image from 'next/image';
import type {FC, DragEvent} from 'react';

type TableProps = {
	data: Table | null;
	id: string;
	isEditLayout: boolean;
	onChangeSelectedTable: (val: Table) => void;
};

const Table: FC<TableProps> = ({
	data,
	id,
	isEditLayout,
	onChangeSelectedTable,
}) => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const drag = (e: DragEvent<HTMLDivElement> | any) => {
		e.dataTransfer.setData('text', e.target.id);
	};

	const onSelectTable = () => {
		if (data && !isEditLayout) {
			onChangeSelectedTable(data);
		}
	};

	return (
		<div
			id={id}
			draggable={!!isEditLayout}
			onDragStart={isEditLayout ? drag : () => undefined}
			className={isEditLayout ? 'cursor-move' : 'cursor-default'}
			onClick={onSelectTable}
		>
			<div className="relative flex h-full justify-center items-center py-1 px-2.5">
				<Image
					id={id}
					width={60}
					height={60}
					src="https://ik.imagekit.io/posyfnb/table_2.png"
					alt="table"
				/>
				<p className="absolute text-l-regular text-neutral-70">
					{data?.table_number}
				</p>
			</div>
		</div>
	);
};

export default Table;
