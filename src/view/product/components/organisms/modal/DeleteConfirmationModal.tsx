import {GetMasterProductsQueryKey} from '@/data/product/sources/GetMasterProductsMutation';
import {DeleteProductResponse} from '@/domain/product/repositories/DeleteMenuProductRepository';
import {Response} from '@/domain/vo/BaseResponse';
import {useAppDispatch, useAppSelector} from '@/view/common/store/hooks';
import {onChangeProductId} from '@/view/common/store/slices/product';
import useProductActions from '@/view/common/store/zustand/Product/ProductAction';
import useProductState from '@/view/common/store/zustand/Product/ProductZustand';
import {useDeleteProductViewModel} from '@/view/product/view-models/DeleteUpdateMenuProductViewModel';
import {useQueryClient} from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import {Button} from 'posy-fnb-core';
import React from 'react';

const Modal = dynamic(() => import('posy-fnb-core').then(el => el.Modal), {
	loading: () => <div />,
});

const OrganismDeleteProductMasterConfirmationModal = () => {
	const queryClient = useQueryClient();
	const dispatch = useAppDispatch();

	const {isOpenConfirmation} = useProductState();
	const {closeConfirmation} = useProductActions();
	const {selectedProductId} = useAppSelector(state => state.product);

	const handleCloseModal = () => {
		closeConfirmation();
		dispatch(onChangeProductId(''));
	};

	const {deleteProduct, isLoading} = useDeleteProductViewModel({
		onSuccess: _data => {
			const data = _data as Response<DeleteProductResponse>;
			if (data) queryClient.invalidateQueries([GetMasterProductsQueryKey]);
			handleCloseModal();
		},
	});

	const handleDeleteProduct = () => {
		deleteProduct(selectedProductId);
	};

	return (
		<Modal
			overflow={false}
			closeOverlay
			open={isOpenConfirmation}
			handleClose={handleCloseModal}
		>
			<section className="flex w-[380px] flex-col items-center justify-center">
				<div className="px-16 flex flex-col items-center">
					<p className="mt-2 text-center text-l-semibold line-clamp-2">
						Are you sure you want to delete this product?
					</p>
				</div>

				<div className="mt-8 flex w-full gap-3">
					<Button
						variant="secondary"
						size="l"
						fullWidth
						onClick={handleCloseModal}
						className="whitespace-nowrap"
					>
						No
					</Button>
					<Button
						isLoading={isLoading}
						variant="primary"
						size="l"
						fullWidth
						onClick={handleDeleteProduct}
					>
						Yes
					</Button>
				</div>
			</section>
		</Modal>
	);
};

export default OrganismDeleteProductMasterConfirmationModal;
