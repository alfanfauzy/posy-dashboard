import {GetOrdersInput} from '@/domain/order/repositories/GetOrdersRepository';
import {PaymentReportList} from '@/domain/payment/models/payment-report';
import {
	GetPaymentSummaryInput,
	PaymentSummary,
} from '@/domain/transaction/repositories/GetPaymentSummaryRepository';
import {formatCurrency} from '@/view/common/utils/UtilsCurrencyFormater';
import {useGetOrdersViewModel} from '@/view/order/view-models/GetOrdersViewModel';
import {useGetPaymentSummaryViewModel} from '@/view/transaction/view-models/GetPaymentSummaryViewModel';
import {Modal} from 'antd';
import {format, parseISO} from 'date-fns';
import {useRouter} from 'next/router';
import React from 'react';

import {
	Category,
	SettlementStatus,
} from '../../../organism/table/payment-report/Column';
import {PaymentReportOrderList} from '../../paymentReportDetail/paymentReportOrderList';

type PaymentReportDetailProps = {
	isOpen: boolean;
	onClose: () => void;
	selectedPaymentReport: PaymentReportList | undefined;
};

type PaymentReportDetailHeaderProps = Pick<
	PaymentReportDetailProps,
	'selectedPaymentReport'
>;

type PaymentReportSummaryProps = {
	dataPayment: PaymentSummary | undefined;
};

type PaymentReportMDRDetailProps = PaymentReportDetailHeaderProps;

const PaymentReportDetailHeader = ({
	selectedPaymentReport,
}: PaymentReportDetailHeaderProps) => {
	const date = parseISO(selectedPaymentReport?.date as string);
	const formattedDate = format(date, 'dd MMM yyyy, hh:mm');
	return (
		<>
			<aside className="flex flex-row items-center justify-between border-b-2 pt-6 pb-3">
				<div>
					<p className="text-l-bold">{selectedPaymentReport?.transaction_id}</p>
				</div>
				<div className="flex flex-row gap-3">
					<p className="border-r-2 px-4">Alfan Fauzy</p>
					<p className="border-r-2 px-4">Table 04</p>
					<p className="px-4">Pax 5</p>
				</div>
			</aside>
			<aside className="flex flex-row items-center justify-between pt-6 pb-3">
				<div>
					<p className="text-m-regular">Date</p>
					<p className="text-m-bold">{formattedDate}</p>
				</div>
				<div>
					<p className="text-m-regular">Category</p>
					<p className="text-m-bold">
						{Category[selectedPaymentReport?.category ?? '']}
					</p>
				</div>
				<div>
					<p className="text-m-regular">Payment</p>
					<p className="text-m-bold">{selectedPaymentReport?.payment_method}</p>
				</div>
				<div>
					<p className="text-m-regular">Settlement Status</p>
					<p
						className={`text-m-bold ${
							SettlementStatus[selectedPaymentReport?.setlement_status ?? '']
								.color
						}`}
					>
						{
							SettlementStatus[selectedPaymentReport?.setlement_status ?? '']
								.text
						}
					</p>
				</div>
			</aside>
		</>
	);
};

const PaymentReportSummary = ({dataPayment}: PaymentReportSummaryProps) => {
	return (
		<aside className="my-3 flex flex-col gap-2 rounded-md border p-4">
			<p className="text-m-semibold">Payment Details</p>
			<div className="flex items-center justify-between text-m-regular">
				<p>Subtotal</p>
				<p>{formatCurrency(dataPayment?.subtotal_price as number)}</p>
			</div>
			{(dataPayment?.discount_general_percentage as number) > 0 && (
				<div className="flex items-center justify-between text-m-regular">
					<p>Discount</p>
					<p>{formatCurrency(dataPayment?.discount_general_price as number)}</p>
				</div>
			)}
			<div className="flex items-center justify-between text-m-regular">
				<p>Service</p>
				<p>
					{formatCurrency(
						dataPayment?.tax_and_charge.service_charge_price as number,
					)}
				</p>
			</div>
			<div className="flex items-center justify-between text-m-regular">
				<p>{`Tax ${dataPayment?.tax_and_charge.tax_percentage}%`}</p>
				<p>{formatCurrency(dataPayment?.tax_and_charge.tax_price as number)}</p>
			</div>
			<div className="flex items-center justify-between text-m-regular">
				<p>Total</p>
				<p>{formatCurrency(dataPayment?.payment_price as number)}</p>
			</div>
		</aside>
	);
};

const PaymentReportMDRDetail = ({
	selectedPaymentReport,
}: PaymentReportMDRDetailProps) => {
	const chargeFeeUnit =
		selectedPaymentReport?.fee_detail.charge_fee_unit === 'percent' ? '%' : '';

	return (
		<aside className="my-3 flex flex-col gap-2 rounded-md border p-4">
			<p className="text-m-semibold">MDR Details</p>
			<div className="flex items-center justify-between text-m-regular">
				<p>Total ammount</p>
				<p>{formatCurrency(selectedPaymentReport?.amount as number)}</p>
			</div>
			<div className="flex items-center justify-between text-m-regular">
				<p>
					MDR ({selectedPaymentReport?.fee_detail.charge_fee} {chargeFeeUnit})
				</p>
				<p>
					-
					{formatCurrency(
						selectedPaymentReport?.fee_detail.charge_amount as number,
					)}
				</p>
			</div>
			<div className="flex items-center justify-between text-m-regular">
				<p>VAT</p>
				<p>
					-
					{formatCurrency(
						selectedPaymentReport?.fee_detail.vat_amount as number,
					)}
				</p>
			</div>
			<div className="flex items-center justify-between text-m-bold">
				<p>Amount received</p>
				<p>
					{formatCurrency(selectedPaymentReport?.ammount_received as number)}
				</p>
			</div>
		</aside>
	);
};

const PaymentReportWithdrawDetail = ({
	selectedPaymentReport,
}: PaymentReportMDRDetailProps) => {
	return (
		<aside className="my-3 flex flex-col gap-2 rounded-md border p-4">
			<p className="text-m-semibold">Details</p>
			<div className="flex items-center justify-between text-m-regular">
				<p>Withdrawal ammount</p>
				<p>{formatCurrency(selectedPaymentReport?.amount as number)}</p>
			</div>
			<div className="flex items-center justify-between text-m-regular">
				<p>Withdrawal fee</p>
				<p>
					-
					{formatCurrency(
						selectedPaymentReport?.fee_detail.charge_amount as number,
					)}
				</p>
			</div>
			<div className="flex items-center justify-between text-m-regular">
				<p>Withdrawal VAT</p>
				<p>
					-
					{formatCurrency(
						selectedPaymentReport?.fee_detail.vat_amount as number,
					)}
				</p>
			</div>
			<div className="flex items-center justify-between text-m-bold">
				<p>Amount received</p>
				<p>
					{formatCurrency(selectedPaymentReport?.ammount_received as number)}
				</p>
			</div>
		</aside>
	);
};

const PaymentReportDetail = ({
	isOpen,
	onClose,
	selectedPaymentReport,
}: PaymentReportDetailProps) => {
	const {query} = useRouter();
	const {restaurantID} = query;

	const paramGetOrder: GetOrdersInput = {
		transaction_uuid: selectedPaymentReport?.id as string,
	};

	const paramPaymentSummary: GetPaymentSummaryInput = {
		restaurant_outlet_uuid: restaurantID as string,
		transaction_uuid: selectedPaymentReport?.id as string,
	};

	const {data: OrderDetail} = useGetOrdersViewModel(paramGetOrder, {
		enabled: isOpen,
	});

	const {data: dataPayment, isLoading: loadDataPayment} =
		useGetPaymentSummaryViewModel(paramPaymentSummary, {
			enabled: isOpen,
		});

	return (
		<Modal open={isOpen} onCancel={onClose} footer={null} width={700}>
			<aside className="p-6">
				<PaymentReportDetailHeader
					selectedPaymentReport={selectedPaymentReport}
				/>

				{selectedPaymentReport?.category === 'TRANSACTION' && (
					<PaymentReportOrderList orderDetail={OrderDetail} />
				)}

				<PaymentReportSummary dataPayment={dataPayment} />

				{selectedPaymentReport?.category === 'TRANSACTION' ? (
					<PaymentReportMDRDetail
						selectedPaymentReport={selectedPaymentReport}
					/>
				) : (
					<PaymentReportWithdrawDetail
						selectedPaymentReport={selectedPaymentReport}
					/>
				)}
			</aside>
		</Modal>
	);
};

export default PaymentReportDetail;
