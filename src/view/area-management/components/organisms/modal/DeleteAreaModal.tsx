import {useDeleteAreaViewModel} from '@/view/area-management/view-models/DeleteAreaViewModel';
import {useAppDispatch, useAppSelector} from '@/view/common/store/hooks';
import {
	onChangeArea,
	onChangeToggleDeleteArea,
} from '@/view/common/store/slices/area';
import {logEvent} from '@/view/common/utils/UtilsAnalytics';
import {Button, Modal} from 'posy-fnb-core';
import React from 'react';

const DeleteAreaModal = () => {
	const dispatch = useAppDispatch();
	const {
		auth: {outletId},
		area: {selectedArea, isOpenDeleteArea},
	} = useAppSelector(state => state);

	const onCloseDeleteArea = () => dispatch(onChangeToggleDeleteArea(false));

	const {DeleteArea, isLoading} = useDeleteAreaViewModel({
		onSuccess: () => {
			onCloseDeleteArea();
			dispatch(
				onChangeArea({
					name: '',
					uuid: '',
					size: '',
					table: '',
				}),
			);
		},
	});

	const onDeleteArea = () => {
		if (selectedArea) {
			DeleteArea({
				area_uuid: selectedArea.uuid,
				restaurant_outlet_uuid: outletId,
			});
			logEvent({
				category: 'area_management',
				action: 'areamanagement_deletearea_click',
			});
		}
	};

	return (
		<Modal open={isOpenDeleteArea} closeOverlay handleClose={close}>
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
						onClick={onCloseDeleteArea}
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
