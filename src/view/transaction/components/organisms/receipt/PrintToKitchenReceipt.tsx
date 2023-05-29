import {CreatePrintOrderToKitchenModel} from '@/domain/order/repositories/CreatePrintOrderToKitchenRepository';
import React, {RefObject} from 'react';

type PrintToKitchenReceiptProps = {
	dataPrintToKitchen: CreatePrintOrderToKitchenModel;
	printToKitchenRef: RefObject<HTMLDivElement>;
};

const PrintToKitchenReceipt = ({
	dataPrintToKitchen,
	printToKitchenRef,
}: PrintToKitchenReceiptProps) => {
	return (
		<article className="hidden">
			<section ref={printToKitchenRef} className="p-6">
				<div className="flex items-center justify-between">
					<p className="text-xl-semibold">
						{dataPrintToKitchen.transaction_category}
					</p>
					<p className="text-xl-semibold">{`Print x1`}</p>
				</div>
				<div className="mt-4">
					<div className="flex items-center justify-between">
						<p className="text-m-semibold">Trx ID</p>
						<p className="text-m-semibold">
							{dataPrintToKitchen.transaction_code}
						</p>
					</div>
					<div className="mt-2 flex items-center justify-between">
						<p className="text-m-semibold">
							{dataPrintToKitchen.customer_name || '-'}
						</p>
						<p className="text-m-semibold">{`Table ${dataPrintToKitchen.table_name}`}</p>
					</div>
				</div>
				<div className="mt-4 border-b border-dotted border-neutral-40" />

				{dataPrintToKitchen.orders.map((order, idx) => (
					<aside key={order.uuid}>
						<div className="mt-4 flex flex-col items-start">
							<p className="text-xl-semibold">{`Order ${idx + 1}`}</p>
							{order?.order_detail.map((orderDetail, v) => (
								<div
									key={`${orderDetail.product_name} - ${v}`}
									className="mt-5"
								>
									<p className="text-xxl-bold">{`${orderDetail.product_name} x${orderDetail.qty}`}</p>
									<p className="mt-2 text-l-regular">
										{orderDetail.addon_information
											.map(
												el =>
													`${el.addon_name}: ${el.addon_variants
														.map(variant => variant.variant_name)
														.join(', ')}`,
											)
											.join(', ')}
									</p>
									<p className="mt-2 text-l-regular">
										<b className="mr-1">Notes:</b>
										{orderDetail.order_note || '-'}
									</p>
								</div>
							))}
						</div>
						<div className="mt-4 border-b border-dotted border-neutral-40" />
					</aside>
				))}
			</section>
		</article>
	);
};

export default PrintToKitchenReceipt;
