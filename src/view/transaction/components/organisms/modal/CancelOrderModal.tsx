import {GetOrdersQueryKey} from '@/data/order/sources/GetOrdersQuery';
import {
	CancelOrder,
	CreateCancelOrderInput,
} from '@/domain/order/repositories/CreateCancelOrderRepository';
import {listCancelReason} from '@/view/common/constants/order';
import {useAppSelector} from '@/view/common/store/hooks';
import {useCreateCancelOrderViewModel} from '@/view/order/view-models/CreateCancelOrderViewModel';
import {useQueryClient} from '@tanstack/react-query';
import {Modal} from 'antd';
import {Button, Input, Select} from 'posy-fnb-core';
import React, {useState} from 'react';

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
	const [reasonOther, setReasonOther] = useState('');

	const {createCancelOrder, isLoading} = useCreateCancelOrderViewModel({
		onSuccess: _data => {
			const data = _data as CancelOrder;
			if (data) {
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
				reason: reason.value === 'OTHERS' ? reasonOther : reason.value,
				restaurant_outlet_uuid: outletId,
			});
		}
	};

	return (
		<Modal
			open={isOpen}
			onCancel={close}
			closable={false}
			footer={null}
			width={400}
		>
			<section className="flex w-full flex-col items-center justify-center p-6">
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
					{reason.value === 'OTHERS' && (
						<div className="mt-6">
							<label>Other Reason: </label>
							<Input
								placeholder="Input other reason"
								size="l"
								onChange={e => setReasonOther(e.target.value)}
							/>
						</div>
					)}
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
						disabled={
							reason.value.length <= 0 ||
							(reason.value === 'OTHERS' && reasonOther === '')
						}
					>
						Yes
					</Button>
				</div>
			</section>
		</Modal>
	);
};

export default CancelOrderModal;
