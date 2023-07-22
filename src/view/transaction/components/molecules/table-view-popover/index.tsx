import {Table} from '@/domain/table/model';
import {useAppDispatch} from '@/view/common/store/hooks';
import {onChangeSelectedTrxId} from '@/view/common/store/slices/transaction';
import React from 'react';

const TableViewPopover = (
	item: Table,
	openCreateTransaction: () => void,
	closePopOver: () => void,
) => {
	const dispatch = useAppDispatch();

	const onCreateTransaction = () => {
		openCreateTransaction();
		closePopOver();
	};

	const onClickTransaction = (id: string) => {
		dispatch(
			onChangeSelectedTrxId({
				id: id,
			}),
		);
		closePopOver();
	};

	return (
		<div className="flex flex-col gap-4">
			<p
				onClick={onCreateTransaction}
				className="hover:text-primary-main cursor-pointer"
			>
				+ Create new trx
			</p>
			{item?.transactions?.map(el => (
				<p
					key={el.uuid}
					onClick={() => onClickTransaction(el.uuid)}
					className="hover:text-primary-main cursor-pointer"
				>
					{item.table_number}
					{el.session_suffix}
				</p>
			))}
		</div>
	);
};

export default TableViewPopover;
