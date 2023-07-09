import {useDeleteAreaViewModel} from '@/view/area-management/view-models/DeleteAreaViewModel';
import {useAppSelector} from '@/view/common/store/hooks';
import {Button, Modal} from 'posy-fnb-core';
import React from 'react';

import {SelectedArea} from '../../templates/area-settings';

type DeleteAreaModalProps = {
	isOpen: boolean;
	close: () => void;
	selectedArea: SelectedArea;
	onSelectArea: (area: SelectedArea | null) => void;
};

const DeleteAreaModal = ({
	close,
	isOpen,
	selectedArea,
	onSelectArea,
}: DeleteAreaModalProps) => {
	const {outletId} = useAppSelector(state => state.auth);
	const {DeleteArea, isLoading} = useDeleteAreaViewModel({
		onSuccess: () => {
			close();
			onSelectArea(null);
		},
	});

	const onDeleteArea = () => {
		DeleteArea({
			area_uuid: selectedArea.uuid,
			restaurant_outlet_uuid: outletId,
		});
	};

	return (
		<Modal open={isOpen} closeOverlay handleClose={close}>
			<section className="flex w-[380px] flex-col items-center justify-center p-4">
				<div className="px-16">
					<p className="text-center text-l-semibold line-clamp-2">
						Are you sure you want to delete this area?
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
						onClick={onDeleteArea}
					>
						Delete
					</Button>
				</div>
			</section>
		</Modal>
	);
};

export default DeleteAreaModal;
