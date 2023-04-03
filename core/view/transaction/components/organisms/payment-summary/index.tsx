import {Orders} from '@/domain/order/model';
import {useAppSelector} from '@/store/hooks';
import {toRupiah} from '@/utils/common';
import {useGetPaymentSummaryViewModel} from '@/view/transaction/view-models/GetPaymentSummaryViewModel';
import {useRouter} from 'next/router';
import {Loading} from 'posy-fnb-core';
import React from 'react';

import {OrderStatusStyle} from '../order-details';

type PaymentSummaryProps = {
	dataOrder: Orders;
	transaction_uuid: string;
};

const PaymentSummary = ({dataOrder, transaction_uuid}: PaymentSummaryProps) => {
	const router = useRouter();
	const {outletId} = useAppSelector(state => state.auth);

	const {data: dataPayment, isLoading: loadPayment} =
		useGetPaymentSummaryViewModel(
			{
				restaurant_outlet_uuid: outletId,
				transaction_uuid,
			},
			{
				onSuccess: data => {
					if (data.message === 'OK') {
						router.push({
							query: {
								...router.query,
								subtotal: data.data.subtotal_price,
								discount_percentage: data.data.discount_general_percentage,
							},
						});
					}
				},
			},
		);

	return (
		<div className="mb-36">
			{dataOrder.map((order, idx) => (
				<div key={order.uuid} className="my-4 w-full">
					<div className="flex items-center justify-between text-m-semibold">
						<p>{`Order ${idx + 1}`}</p>
						<p
							className={OrderStatusStyle({
								variant: order.status,
							})}
						>
							{order.status.split('_')[1]}
						</p>
					</div>
					<div className="mt-2 flex w-full flex-col gap-2">
						{order.order_detail.map(orderDetail => (
							<div key={orderDetail.uuid} className="flex justify-between">
								<p className="flex-1 text-m-regular">
									{orderDetail.product_name} x{orderDetail.qty}
								</p>
								<p className="text-m-regular">
									{toRupiah(orderDetail.price_final)}
								</p>
							</div>
						))}
					</div>
				</div>
			))}
			{loadPayment && (
				<div className="mt-10 pb-4 flex h-full items-center justify-center">
					<Loading size={40} />
				</div>
			)}
			{dataPayment && (
				<div className="mt-2.5 flex flex-col gap-2 border-t border-t-neutral-30 pt-2">
					<p className="text-m-semibold">Payment Details</p>

					<div className="flex items-center justify-between text-m-medium">
						<p>Subtotal</p>
						<p>{toRupiah(dataPayment.subtotal_price)}</p>
					</div>
					{dataPayment.discount_general_price > 0 && (
						<div className="flex items-center justify-between text-m-medium">
							<p>Discount</p>
							<p>-{toRupiah(dataPayment.discount_general_price)}</p>
						</div>
					)}
					<div className="flex items-center justify-between text-m-medium">
						<p>Service</p>
						<p>{toRupiah(dataPayment.tax_and_charge.service_charge_price)}</p>
					</div>
					<div className="flex items-center justify-between text-m-medium">
						<p>PB1</p>
						<p>{toRupiah(dataPayment.tax_and_charge.tax_price)}</p>
					</div>
					<div className="flex items-center justify-between text-l-semibold">
						<p>Total</p>
						<p>{toRupiah(dataPayment.payment_price)}</p>
					</div>
				</div>
			)}
		</div>
	);
};

export default PaymentSummary;
