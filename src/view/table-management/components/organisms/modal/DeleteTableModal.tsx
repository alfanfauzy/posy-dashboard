import {Table} from '@/domain/table/model';
import {useAppSelector} from '@/view/common/store/hooks';
import {useDeleteTableViewModel} from '@/view/table-management/view-models/DeleteTableViewModel';
import {Button, Modal} from 'posy-fnb-core';
import React from 'react';

type DeleteTableModalProps = {
	isOpen: boolean;
	close: () => void;
	selectedTable: Table;
	onSelectTable: (table: null) => void;
};

const DeleteTableModal = ({
	close,
	isOpen,
	selectedTable,
	onSelectTable,
}: DeleteTableModalProps) => {
	const {outletId} = useAppSelector(state => state.auth);
	const {DeleteTable, isLoading} = useDeleteTableViewModel({
		onSuccess: () => {
			close();
			onSelectTable(null);
		},
	});

	const onDeleteTable = () => {
		DeleteTable({
			table_uuid: selectedTable?.uuid,
			restaurant_outlet_uuid: outletId,
		});
	};

	return (
		<Modal open={isOpen} closeOverlay handleClose={close}>
			<section className="flex w-[380px] flex-col items-center justify-center p-4">
				<div className="px-16">
					<p className="text-center text-l-semibold line-clamp-2">
						Are you sure you want to delete this table?
					</p>
				</div>
				<div className="mt-8 flex w-full gap-3">
					<Button
						variant="secondary"
						size="l"
						fullWidth
						onClick={close}
						className="whitespace-nowrap"
					>
						Cancel
					</Button>
					<Button
						isLoading={isLoading}
						variant="primary"
						size="l"
						fullWidth
						onClick={onDeleteTable}
					>
						Delete
					</Button>
				</div>
			</section>
		</Modal>
	);
};

export default DeleteTableModal;
