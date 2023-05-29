import {Transaction, TransactionStatus} from '@/domain/transaction/model';
import {Can} from '@/view/auth/components/organisms/rbac';
import {toRupiah} from '@/view/common/utils/common';
import {dateFormatter} from '@/view/common/utils/UtilsdateFormatter';
import {useGetOrdersViewModel} from '@/view/order/view-models/GetOrdersViewModel';
import PrintBillReceipt from '@/view/transaction/components/organisms/receipt/PrintBillReceipt';
import {useCreatePrintReceiptViewModel} from '@/view/transaction/view-models/CreatePrintReceiptViewModel';
import {useGetPaymentSummaryViewModel} from '@/view/transaction/view-models/GetPaymentSummaryViewModel';
import {useGetTransactionViewModel} from '@/view/transaction/view-models/GetTransactionViewModel';
import dynamic from 'next/dynamic';
import {Button} from 'posy-fnb-core';
import React, {useRef} from 'react';
import {useReactToPrint} from 'react-to-print';

import {generateStatusTransaction} from '../../table/Columns';

const Modal = dynamic(
	() => import('posy-fnb-core').then(module => module.Modal),
	{
		loading: () => <div />,
	},
);

type HistoryDetailModalProps = {
	record: Transaction;
	isOpenDetail: boolean;
	closeDetail: () => void;
	openRefund: () => void;
	setValueRefund: (record: Transaction) => void;
};

const HistoryDetailModal = ({
	record,
	closeDetail,
	isOpenDetail,
	openRefund,
	setValueRefund,
}: HistoryDetailModalProps) => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const printReceiptRef = useRef<any>();

	const {data: dataTransaction, isLoading: loadDataHistory} =
		useGetTransactionViewModel(
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
			show_cancel: true,
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

	const handlePrintReceiptRef = useReactToPrint({
		content: () => printReceiptRef.current,
	});

	const {
		data: dataReceipt,
		createPrintReceipt,
		isLoading: loadReceipt,
	} = useCreatePrintReceiptViewModel({
		onSuccess: data => {
			if (data) {
				setTimeout(() => {
					handlePrintReceiptRef();
				}, 100);
			}
		},
	});

	const handleOpenRefund = (transaction: Transaction) => {
		openRefund();
		setValueRefund(transaction);
		closeDetail();
	};

	return (
		<>
			<Modal
				className="!p-0 lg:min-w-[700px]"
				isLoading={loadDataHistory || loadDataorder || loadDataPayment}
				closeOverlay
				open={isOpenDetail}
				handleClose={closeDetail}
				confirmButton={
					dataOrder && dataTransaction ? (
						<div className="mx-4 flex w-full items-center justify-center gap-4">
							{dataTransaction.status !== TransactionStatus.REFUND && (
								<Can I="create" an="refund">
									<Button
										variant="secondary"
										onClick={() => handleOpenRefund(dataTransaction)}
										fullWidth
									>
										Refund
									</Button>
								</Can>
							)}
							<Button
								variant="primary"
								isLoading={loadReceipt}
								onClick={() =>
									createPrintReceipt({
										transaction_uuid: dataTransaction.uuid,
										restaurant_outlet_uuid:
											dataTransaction.restaurant_outlet_uuid,
									})
								}
								fullWidth
							>
								Print receipt
							</Button>
						</div>
					) : (
						<div />
					)
				}
			>
				{dataTransaction && dataPayment && (
					<section className="px-10 pt-10 pb-6 text-primary-main">
						<aside className="flex items-center justify-between gap-4 border-b border-neutral-40 pb-4">
							<div className="flex-1">
								<p className="text-xxl-bold">
									{dataTransaction.transaction_code}
								</p>
							</div>
							<div className="flex gap-5 text-xl-regular">
								<div className="border-r border-neutral-40 pr-4">
									<p>{dataTransaction.customer_name || '-'}</p>
								</div>
								<div className="border-r border-neutral-40 pr-4">
									<p>{`Table ${dataTransaction.table_number || '-'}`}</p>
								</div>
								<div>
									<p>{`Pax ${dataTransaction.total_pax}`}</p>
								</div>
							</div>
						</aside>
						<aside className="grid grid-cols-5 gap-6 border-b border-neutral-40 py-4">
							<div className="col-span-2">
								<div className="text-l-bold">
									<div>Date</div>
									{dateFormatter(
										dataTransaction.created_at,
										'dd MMM yyyy, HH:mm',
									)}
								</div>
							</div>
							<div>
								<p>Staff</p>
								<p className="text-l-bold">{dataTransaction.staff || '-'}</p>
							</div>
							<div>
								<p>Payment</p>
								<p className="text-l-bold">
									{dataTransaction.payment_method_name || '-'}
								</p>
							</div>
							<div className="flex flex-col items-end">
								<p>Status</p>
								<p className="text-l-bold">
									{generateStatusTransaction(dataTransaction.status)}
								</p>
							</div>
						</aside>
						{dataOrder && (
							<>
								<aside className="border-b border-neutral-40 py-4">
									{dataOrder.map((order, idx) => (
										<aside key={order.uuid} className="last:mb-0 mb-4">
											<div>
												<p className="text-xl-semibold text-primary-main">
													{`Order ${idx + 1}`}
												</p>
											</div>
											{order?.order_detail.map(item => (
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
													{item.addon_information.length > 0 && (
														<div
															id="addon"
															className="ml-10 flex flex-col gap-1"
														>
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
													)}

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
										<p>
											{toRupiah(
												dataPayment.tax_and_charge.service_charge_price,
											)}
										</p>
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
							</>
						)}
					</section>
				)}
			</Modal>
			{dataReceipt && (
				<PrintBillReceipt
					data={dataReceipt}
					printReceiptRef={printReceiptRef}
				/>
			)}
		</>
	);
};
export default HistoryDetailModal;
