import {GetCategoriesQueryKey} from '@/data/category/sources/GetCategoriesQuery';
import {UpdateCategoryResponse} from '@/domain/category/repositories/UpdateCategoryRepository';
import {Response} from '@/domain/vo/BaseResponse';
import {useDeleteCategoryViewModel} from '@/view/category/view-models/DeleteCategoryViewModel';
import useCategoryActions from '@/view/common/store/zustand/Category/CategoryAction';
import useCategoryState from '@/view/common/store/zustand/Category/CategoryZustand';
import {useQueryClient} from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import {Button} from 'posy-fnb-core';
import React from 'react';

const Modal = dynamic(() => import('posy-fnb-core').then(el => el.Modal), {
	loading: () => <div />,
});

const OrganismDeleteConfirmationModal = () => {
	const queryClient = useQueryClient();

	const {isOpenConfirmation, selectedCategoryId} = useCategoryState();
	const {closeConfirmation} = useCategoryActions();

	const {deleteCategory, isLoading} = useDeleteCategoryViewModel({
		onSuccess: _data => {
			const data = _data as Response<UpdateCategoryResponse>;
			if (data) queryClient.invalidateQueries([GetCategoriesQueryKey]);
			closeConfirmation();
		},
	});

	const handleDeleteCategory = () => {
		deleteCategory(selectedCategoryId);
	};

	return (
		<Modal
			overflow={false}
			closeOverlay
			open={isOpenConfirmation}
			handleClose={closeConfirmation}
		>
			<section className="flex w-[380px] flex-col items-center justify-center">
				<div className="px-16 flex flex-col items-center">
					<p className="mt-2 text-center text-l-semibold line-clamp-2">
						Are you sure you want to delete this category?
					</p>
				</div>

				<div className="mt-8 flex w-full gap-3">
					<Button
						variant="secondary"
						size="l"
						fullWidth
						onClick={closeConfirmation}
						className="whitespace-nowrap"
					>
						No
					</Button>
					<Button
						isLoading={isLoading}
						variant="primary"
						size="l"
						fullWidth
						onClick={handleDeleteCategory}
					>
						Yes
					</Button>
				</div>
			</section>
		</Modal>
	);
};

export default OrganismDeleteConfirmationModal;
