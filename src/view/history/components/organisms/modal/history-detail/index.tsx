import {Transaction} from '@/domain/transaction/model';
import {toRupiah} from '@/view/common/utils/common';
import {dateFormatter} from '@/view/common/utils/UtilsdateFormatter';
import {useGetOrdersViewModel} from '@/view/order/view-models/GetOrdersViewModel';
import {useGetPaymentSummaryViewModel} from '@/view/transaction/view-models/GetPaymentSummaryViewModel';
import {useGetTransactionViewModel} from '@/view/transaction/view-models/GetTransactionViewModel';
import dynamic from 'next/dynamic';
import {Button} from 'posy-fnb-core';
import React from 'react';

import {generateStatus} from '../../table/Columns';

const Modal = dynamic(() => import('posy-fnb-core').then(el => el.Modal), {
	loading: () => <div />,
});

type HistoryDetailModalProps = {
	record: Transaction;
	isOpen: boolean;
	close: () => void;
};

const HistoryDetailModal = ({
	record,
	close,
	isOpen,
}: HistoryDetailModalProps) => {
	const {data, isLoading: loadDataHistory} = useGetTransactionViewModel(
		{
			transaction_uuid: record && record?.uuid,
		},
		{
			enabled: !!record,
		},
	);

	const {data: dataOrder, isLoading: loadDataorder} = useGetOrdersViewModel(
		{
			transaction_uuid: record && record?.uuid,
		},
		{
			enabled: !!record,
		},
	);

	const {data: dataPayment, isLoading: loadDataPayment} =
		useGetPaymentSummaryViewModel(
			{
				transaction_uuid: record && record?.uuid,
				restaurant_outlet_uuid: record && record?.restaurant_outlet_uuid,
			},
			{
				enabled: !!record,
			},
		);

	const onOpenRefund = () => close();
	const onPrintReceipt = () => close();

	return (
		<Modal
			className="!p-0"
			isLoading={loadDataHistory || loadDataorder || loadDataPayment}
			open={isOpen}
			handleClose={close}
			confirmButton={
				<div className="mx-4 flex w-full items-center justify-center gap-4">
					<Button variant="secondary" onClick={onOpenRefund} fullWidth>
						Refund
					</Button>
					<Button variant="primary" onClick={onPrintReceipt} fullWidth>
						Print receipt
					</Button>
				</div>
			}
		>
			{data && dataOrder && dataPayment && (
				<section className="px-10 pt-10 pb-6 lg:min-w-[700px] text-primary-main">
					<aside className="flex items-center justify-between gap-4 border-b border-neutral-40 pb-4">
						<div className="flex-1">
							<p className="text-xxl-bold">{data.transaction_code}</p>
						</div>
						<div className="flex gap-5 text-xl-regular">
							<div className="border-r border-neutral-40 pr-4">
								<p>{data.customer_name || '-'}</p>
							</div>
							<div className="border-r border-neutral-40 pr-4">
								<p>{`Table ${data.table_number || '-'}`}</p>
							</div>
							<div>
								<p>{`Pax ${data.total_pax}`}</p>
							</div>
						</div>
					</aside>
					<aside className="grid grid-cols-5 gap-6 border-b border-neutral-40 py-4">
						<div className="col-span-2">
							<p className="text-l-bold">
								<p>Date</p>
								{dateFormatter(data.created_at, 'dd MMM yyyy, HH:mm')}
							</p>
						</div>
						<div>
							<p>Staff</p>
							<p className="text-l-bold">{data.staff || '-'}</p>
						</div>
						<div>
							<p>Payment</p>
							<p className="text-l-bold">{data.payment_method_name || '-'}</p>
						</div>
						<div className="flex flex-col items-end">
							<p>Status</p>
							<p className="text-l-bold">{generateStatus(data.status)}</p>
						</div>
					</aside>
					<aside className="border-b border-neutral-40 py-4">
						{dataOrder.map((order, idx) => (
							<aside key={order.uuid} className="last:mb-0 mb-4">
								<div>
									<p className="text-xl-semibold text-primary-main">
										{`Order ${idx + 1}`}
									</p>
								</div>
								{order.order_detail.map(item => (
									<div key={item.uuid} className="mt-4">
										<div className="flex items-start justify-between">
											<div className="flex w-3/4 items-start break-words lg:w-1/2">
												<p className="mr-5 text-xl-semibold">{`${item.qty}x`}</p>
												<p className="flex-1 text-l-regular">
													{item.product_name}
												</p>
											</div>
											<div className="flex flex-col items-end">
												<p className="text-l-regular">
													{toRupiah(item.price_subtotal)}
												</p>
											</div>
										</div>
										<div id="addon" className="ml-10 flex flex-col gap-1">
											<div className="flex items-start justify-between">
												<p className="w-3/4 text-l-regular line-clamp-2">
													{item.addon_information
														.map(
															el =>
																`${el.addon_name}: ${el.addon_variants
																	.map(variant => variant.variant_name)
																	.join(', ')}`,
														)
														.join(', ')}
												</p>
												<p className="text-l-regular text-neutral-60">
													{toRupiah(item.price_addon)}
												</p>
											</div>
										</div>
										{item.order_note && (
											<div className="mt-2 ml-10 text-primary-main text-l-regular max-w-[400px]">
												Notes:{item.order_note}
											</div>
										)}
									</div>
								))}
							</aside>
						))}
					</aside>

					<aside className="flex flex-col gap-2 pt-4">
						<div className="flex items-center justify-between text-m-medium">
							<p>Subtotal</p>
							<p>{toRupiah(dataPayment.subtotal_price)}</p>
						</div>
						<div className="flex items-center justify-between text-m-medium">
							<p>Discount</p>
							<p>{toRupiah(dataPayment.discount_general_price)}</p>
						</div>
						<div className="flex items-center justify-between text-m-medium">
							<p>Service</p>
							<p>{toRupiah(dataPayment.tax_and_charge.service_charge_price)}</p>
						</div>
						<div className="flex items-center justify-between text-m-medium">
							<p>{`Tax ${dataPayment.tax_and_charge.tax_percentage}%`}</p>
							<p>{toRupiah(dataPayment.tax_and_charge.tax_price)}</p>
						</div>
						<div className="flex items-center justify-between text-l-semibold">
							<p>Total</p>
							<p>{toRupiah(dataPayment.payment_price)}</p>
						</div>
					</aside>
				</section>
			)}
		</Modal>
	);
};
export default HistoryDetailModal;
