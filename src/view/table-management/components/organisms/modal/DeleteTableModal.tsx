import {useAppDispatch, useAppSelector} from '@/view/common/store/hooks';
import {onChangeSelectedTable} from '@/view/common/store/slices/table';
import {logEvent} from '@/view/common/utils/UtilsAnalytics';
import {useDeleteTableViewModel} from '@/view/table-management/view-models/DeleteTableViewModel';
import {Button, Modal} from 'posy-fnb-core';
import React from 'react';

type DeleteTableModalProps = {
	isOpen: boolean;
	close: () => void;
};

const DeleteTableModal = ({close, isOpen}: DeleteTableModalProps) => {
	const dispatch = useAppDispatch();
	const {outletId} = useAppSelector(state => state.auth);
	const {selectedTable} = useAppSelector(state => state.table);

	const {DeleteTable, isLoading} = useDeleteTableViewModel({
		onSuccess: () => {
			close();
			dispatch(onChangeSelectedTable(null));
		},
	});

	const onDeleteTable = () => {
		DeleteTable({
			table_uuid: selectedTable?.uuid || '',
			restaurant_outlet_uuid: outletId,
		});
		logEvent({
			category: 'table_management',
			action: 'tablemanagement_deletetable_click',
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
