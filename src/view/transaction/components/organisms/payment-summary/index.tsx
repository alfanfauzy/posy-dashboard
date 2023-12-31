import {Orders} from '@/domain/order/model';
import {useAppDispatch, useAppSelector} from '@/view/common/store/hooks';
import {onChangePayment} from '@/view/common/store/slices/transaction';
import {toRupiah} from '@/view/common/utils/common';
import {generateStatusOrder} from '@/view/common/utils/UtilsGenerateOrderStatus';
import {useGetPaymentSummaryViewModel} from '@/view/transaction/view-models/GetPaymentSummaryViewModel';
import {Loading} from 'posy-fnb-core';
import React from 'react';

type PaymentSummaryProps = {
	dataOrder: Orders;
};

const PaymentSummary = ({dataOrder}: PaymentSummaryProps) => {
	const dispatch = useAppDispatch();
	const {outletId, isSubscription, isLoggedIn} = useAppSelector(
		state => state.auth,
	);
	const {selectedTrxId} = useAppSelector(state => state.transaction);

	const {data: dataPayment, isLoading: loadPayment} =
		useGetPaymentSummaryViewModel(
			{
				restaurant_outlet_uuid: outletId,
				transaction_uuid: selectedTrxId,
			},
			{
				enabled: outletId.length > 0 && isSubscription && isLoggedIn,
				onSuccess: data => {
					if (data.message === 'OK') {
						dispatch(
							onChangePayment({
								payment: {
									subtotal: data.data.subtotal_price,
									discount_percentage: data.data.discount_general_percentage,
									total: data.data.payment_price,
								},
							}),
						);
					}
				},
			},
		);

	return (
		<div className="mb-20">
			{dataOrder.map(order => (
				<div key={order.uuid} className="my-4 w-full">
					<div className="flex items-center justify-between text-m-semibold">
						<p>{`Order ${order.order_number}`}</p>
						{generateStatusOrder(order.status)}
					</div>
					<div className="mt-2 flex w-full flex-col gap-2">
						{order.order_detail?.map(orderDetail => (
							<div key={orderDetail.uuid} className="flex justify-between">
								<p className="flex-1 text-m-regular">
									{orderDetail.product_name} x{orderDetail.qty}
								</p>
								<p className="text-m-regular">
									{toRupiah(orderDetail.price_subtotal)}
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
						<p>PB1 {dataPayment.tax_and_charge.tax_percentage}%</p>
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
