import {Orders} from '@/domain/order/model';
import {toRupiah} from '@/utils/common';
import React from 'react';

type PaymentSummaryProps = {
	dataOrder: Orders;
};

const PaymentSummary = ({dataOrder}: PaymentSummaryProps) => {
	return (
		<div className="mb-36">
			{dataOrder.map((order, idx) => (
				<div key={order.uuid} className="my-4 w-full">
					<div className="flex items-center justify-between text-m-semibold">
						<p>{`Order ${idx + 1}`}</p>
						<p className="lowercase text-green-success first-letter:uppercase">
							Served
							{/* {order.status.split('_')[1]} */}
						</p>
					</div>
					<div className="mt-2 flex w-full flex-col gap-2">
						{order.order_detail.map(orderDetail => (
							<div key={orderDetail.uuid} className="flex justify-between">
								<p className="flex-1 text-m-regular">
									{orderDetail.product_name} x{orderDetail.qty}
								</p>
								<p className="text-m-regular">{orderDetail.price_final}</p>
							</div>
						))}
					</div>
				</div>
			))}
			<div className="mt-2.5 flex flex-col gap-2 border-t border-t-neutral-30 pt-2">
				<p className="text-m-semibold">Payment Details</p>
				<div className="flex items-center justify-between text-m-medium">
					<p>Subtotal</p>
					<p>{toRupiah(75000)}</p>
				</div>
				<div className="flex items-center justify-between text-m-medium">
					<p>Discount</p>
					<p>-{toRupiah(7500)}</p>
				</div>
				<div className="flex items-center justify-between text-m-medium">
					<p>Service</p>
					<p>{toRupiah(0)}</p>
				</div>
				<div className="flex items-center justify-between text-m-medium">
					<p>PB1</p>
					<p>{toRupiah(7500)}</p>
				</div>
				<div className="flex items-center justify-between text-l-semibold">
					<p>Total</p>
					<p>{toRupiah(75000)}</p>
				</div>
			</div>
		</div>
	);
};

export default PaymentSummary;
