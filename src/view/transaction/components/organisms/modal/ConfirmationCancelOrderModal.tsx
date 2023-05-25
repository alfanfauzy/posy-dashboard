import {mapToCreateCancelOrderPayload} from '@/data/order/mappers/OrderMapper';
import {GetOrdersQueryKey} from '@/data/order/sources/GetOrdersQuery';
import {CancelOrder} from '@/domain/order/repositories/CreateCancelOrderRepository';
import {Transaction} from '@/domain/transaction/model';
import {useAppSelector} from '@/view/common/store/hooks';
import {useCreateCancelOrderViewModel} from '@/view/order/view-models/CreateCancelOrderViewModel';
import {ValidationSchemaCancelOrderType} from '@/view/transaction/schemas/cancel-order';
import {useQueryClient} from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import {Button} from 'posy-fnb-core';
import React from 'react';

const Modal = dynamic(() => import('posy-fnb-core').then(el => el.Modal), {
	loading: () => <div />,
});

type ConfirmationCancelOrderModalProps = {
	close: () => void;
	isOpen: boolean;
	form: ValidationSchemaCancelOrderType;
	dataTransaction: Transaction;
	handleCloseCancelOrder: () => void;
};

const ConfirmationCancelOrderModal = ({
	isOpen,
	close,
	form,
	dataTransaction,
	handleCloseCancelOrder,
}: ConfirmationCancelOrderModalProps) => {
	const queryClient = useQueryClient();
	const {outletId} = useAppSelector(state => state.auth);

	const {createCancelOrder, isLoading} = useCreateCancelOrderViewModel({
		onSuccess: _data => {
			const data = _data as CancelOrder;
			if (data) {
				queryClient.invalidateQueries([GetOrdersQueryKey]);
				handleCloseCancelOrder();
			}
		},
	});

	const onCancelTransaction = () => {
		createCancelOrder(
			mapToCreateCancelOrderPayload(dataTransaction.uuid, outletId, form),
		);
	};

	return (
		<Modal open={isOpen} handleClose={close}>
			<section className="flex w-[380px] flex-col items-center justify-center p-4">
				<div className="px-16">
					<p className="text-center text-l-semibold line-clamp-2">
						Are you sure you want to cancel this order?
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
						No, Maybe Later
					</Button>
					<Button
						isLoading={isLoading}
						variant="primary"
						size="l"
						fullWidth
						onClick={onCancelTransaction}
					>
						Cancel
					</Button>
				</div>
			</section>
		</Modal>
	);
};

export default ConfirmationCancelOrderModal;
