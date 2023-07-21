import {Table} from '@/domain/table/model';
import {useAppDispatch, useAppSelector} from '@/view/common/store/hooks';
import {onChangeSelectedTable} from '@/view/common/store/slices/table';
import Image from 'next/image';
import type {FC, DragEvent} from 'react';

type TableProps = {
	data: Table | null;
	id: string;
};

const Table: FC<TableProps> = ({data, id}) => {
	const dispatch = useAppDispatch();
	const {isEditLayout} = useAppSelector(state => state.table);

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const drag = (e: DragEvent<HTMLDivElement> | any) => {
		e.dataTransfer.setData('text', e.target.id);
	};

	const onSelectTable = () => {
		if (data && !isEditLayout) {
			dispatch(onChangeSelectedTable(data));
		}
	};

	return (
		<div
			id={id}
			draggable={!!isEditLayout}
			onDragStart={isEditLayout ? drag : () => undefined}
			className={isEditLayout ? 'cursor-move' : 'cursor-pointer'}
			onClick={onSelectTable}
		>
			<div className="relative flex h-full justify-center items-center py-1 px-2.5">
				<Image
					id={id}
					width={60}
					height={60}
					src={data?.table_image || ''}
					alt="table"
				/>
				<p className="absolute text-s-regular lg:text-l-regular text-neutral-70">
					{data?.table_number}
				</p>
			</div>
		</div>
	);
};

export default Table;
