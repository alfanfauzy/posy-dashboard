import {listCancelReason} from '@/constants/order';
import {GetOrdersQueryKey} from '@/data/order/sources/GetOrdersQuery';
import {CreateCancelOrderInput} from '@/domain/order/repositories/CreateCancelOrderRepository';
import {useAppSelector} from '@/store/hooks';
import {useCreateCancelOrderViewModel} from '@/view/order/view-models/CreateCancelOrderViewModel';
import {useQueryClient} from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import {Button, Select} from 'posy-fnb-core';
import React, {useState} from 'react';

const Modal = dynamic(() => import('posy-fnb-core').then(el => el.Modal), {
	loading: () => <div />,
});

type CancelOrderModalProps = {
	isOpen: boolean;
	close: () => void;
	value:
		| (Pick<
				CreateCancelOrderInput,
				'is_all' | 'order_detail_uuid' | 'order_uuid'
		  > & {product_name: string})
		| undefined;
};

const CancelOrderModal = ({isOpen, close, value}: CancelOrderModalProps) => {
	const queryClient = useQueryClient();
	const {outletId} = useAppSelector(state => state.auth);
	const [reason, setReason] = useState({label: '', value: ''});

	const {createCancelOrder, isLoading} = useCreateCancelOrderViewModel({
		onSuccess: data => {
			if (data.message === 'OK') {
				queryClient.invalidateQueries([GetOrdersQueryKey]);
				close();
			}
		},
	});

	const handleCancelOrder = () => {
		if (value) {
			createCancelOrder({
				is_all: value.is_all,
				order_uuid: value.order_uuid,
				order_detail_uuid: value.order_detail_uuid,
				reason: reason.value,
				restaurant_outlet_uuid: outletId,
			});
		}
	};

	return (
		<Modal open={isOpen} handleClose={close}>
			<section className="flex w-[340px] flex-col items-center justify-center p-4">
				<div className="">
					<p className="text-center text-l-semibold line-clamp-2">
						{`Are you sure you want to cancel  ${
							value?.product_name && value.product_name.length > 0
								? value?.product_name
								: 'this order'
						} ?`}
					</p>
					<div className="mt-6">
						<Select
							className="w-full"
							size="l"
							options={listCancelReason}
							onChange={setReason}
							placeholder="Select the reason"
						/>
					</div>
				</div>
				<div className="mt-8 flex w-full gap-3">
					<Button
						variant="secondary"
						size="l"
						fullWidth
						onClick={close}
						className="whitespace-nowrap"
					>
						No
					</Button>
					<Button
						variant="primary"
						size="l"
						fullWidth
						onClick={handleCancelOrder}
						isLoading={isLoading}
						disabled={reason.value.length <= 0}
					>
						Yes
					</Button>
				</div>
			</section>
		</Modal>
	);
};

export default CancelOrderModal;
