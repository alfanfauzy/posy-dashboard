import {GetPaymentReportDetailResponse} from '@/data/payment/types/GetPaymentReportDetailType';
import {GetOrdersInput} from '@/domain/order/repositories/GetOrdersRepository';
import {PaymentReportList} from '@/domain/payment/models/payment-report';
import {GetPaymentReportDetailPayload} from '@/domain/payment/repositories/GetPaymentReportDetail';
import {Transaction} from '@/domain/transaction/model';
import {
	GetPaymentSummaryInput,
	PaymentSummary,
} from '@/domain/transaction/repositories/GetPaymentSummaryRepository';
import {useAppSelector} from '@/view/common/store/hooks';
import {formatCurrency} from '@/view/common/utils/UtilsCurrencyFormater';
import {useGetOrdersViewModel} from '@/view/order/view-models/GetOrdersViewModel';
import {useGetPaymentReportDetailViewModel} from '@/view/payment-setting/view-models/GetPaymentReportDetailViewModel';
import {useGetPaymentSummaryViewModel} from '@/view/transaction/view-models/GetPaymentSummaryViewModel';
import {useGetTransactionViewModel} from '@/view/transaction/view-models/GetTransactionViewModel';
import {Modal} from 'antd';
import {format, parseISO} from 'date-fns';
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
> & {
	detailTransaction: Transaction | undefined;
};

type PaymentReportSummaryProps = {
	dataPayment: PaymentSummary | undefined;
};

type PaymentReportMDRDetailProps = {
	paymentReportDetail: GetPaymentReportDetailResponse | undefined;
};

const PaymentReportDetailHeader = ({
	detailTransaction,
	selectedPaymentReport,
}: PaymentReportDetailHeaderProps) => {
	const date = parseISO(selectedPaymentReport?.date as string);
	const formattedDate = format(date, 'dd MMM yyyy, hh:mm');

	const customerName = detailTransaction?.customer_name ?? '-';
	const customerTable = detailTransaction?.table_number ?? '-';
	const customerTotalPax = detailTransaction?.total_pax ?? '-';

	return (
		<>
			<aside className="flex flex-row items-center justify-between border-b-2 pt-6 pb-3">
				<div>
					<p className="text-l-bold">{selectedPaymentReport?.transaction_id}</p>
				</div>
				<div className="flex flex-row gap-3">
					<p className="border-r-2 px-4">{customerName}</p>
					<p className="border-r-2 px-4">Table {customerTable}</p>
					<p className="px-4">Pax {customerTotalPax}</p>
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
	paymentReportDetail,
}: PaymentReportMDRDetailProps) => {
	const chargeFeeUnit =
		paymentReportDetail?.fee_detail.charge_fee_unit === 'percent' ? '%' : '';

	return (
		<aside className="my-3 flex flex-col gap-2 rounded-md border p-4">
			<p className="text-m-semibold">MDR Details</p>
			<div className="flex items-center justify-between text-m-regular">
				<p>Total ammount</p>
				<p>{formatCurrency(paymentReportDetail?.amount as number)}</p>
			</div>
			<div className="flex items-center justify-between text-m-regular">
				<p>
					MDR ({paymentReportDetail?.fee_detail.charge_fee} {chargeFeeUnit})
				</p>
				<p>
					-
					{formatCurrency(
						paymentReportDetail?.fee_detail.charge_amount as number,
					)}
				</p>
			</div>
			<div className="flex items-center justify-between text-m-regular">
				<p>VAT</p>
				<p>
					-
					{formatCurrency(paymentReportDetail?.fee_detail.vat_amount as number)}
				</p>
			</div>
			<div className="flex items-center justify-between text-m-bold">
				<p>Amount received</p>
				<p>{formatCurrency(paymentReportDetail?.net_amount as number)}</p>
			</div>
		</aside>
	);
};

const PaymentReportWithdrawDetail = ({
	paymentReportDetail,
}: PaymentReportMDRDetailProps) => {
	return (
		<aside className="my-3 flex flex-col gap-2 rounded-md border p-4">
			<p className="text-m-semibold">Details</p>
			<div className="flex items-center justify-between text-m-regular">
				<p>Withdrawal ammount</p>
				<p>{formatCurrency(paymentReportDetail?.net_amount as number)}</p>
			</div>
			<div className="flex items-center justify-between text-m-regular">
				<p>Withdrawal fee</p>
				<p>
					-
					{formatCurrency(
						paymentReportDetail?.fee_detail.charge_amount as number,
					)}
				</p>
			</div>
			<div className="flex items-center justify-between text-m-regular">
				<p>Withdrawal VAT</p>
				<p>
					-
					{formatCurrency(paymentReportDetail?.fee_detail.vat_amount as number)}
				</p>
			</div>
			<div className="flex items-center justify-between text-m-bold">
				<p>Amount received</p>
				<p>{formatCurrency(paymentReportDetail?.amount as number)}</p>
			</div>
		</aside>
	);
};

const PaymentReportDetail = ({
	isOpen,
	onClose,
	selectedPaymentReport,
}: PaymentReportDetailProps) => {
	const {outletId} = useAppSelector(state => state.auth);
	const isTransaction = selectedPaymentReport?.category === 'TRANSACTION';

	const {data: detailTransaction} = useGetTransactionViewModel({
		transaction_uuid: selectedPaymentReport?.reference_id as string,
	});

	const paramGetOrder: GetOrdersInput = {
		transaction_uuid: selectedPaymentReport?.reference_id as string,
	};

	const paramPaymentSummary: GetPaymentSummaryInput = {
		transaction_uuid: selectedPaymentReport?.reference_id as string,
		restaurant_outlet_uuid: detailTransaction?.restaurant_outlet_uuid as string,
	};

	const paramPaymentReportDetail: GetPaymentReportDetailPayload = {
		restaurant_outlet_uuid: outletId as string,
		transaction_id: selectedPaymentReport?.id as string,
	};

	const {data: OrderDetail} = useGetOrdersViewModel(paramGetOrder, {
		enabled: isOpen && selectedPaymentReport?.category !== 'WITHDRAWAL',
	});

	const {data: dataPayment} = useGetPaymentSummaryViewModel(
		paramPaymentSummary,
		{
			enabled: isOpen && !!detailTransaction,
		},
	);

	const {data: paymentReportDetail} = useGetPaymentReportDetailViewModel(
		paramPaymentReportDetail,
		{
			enabled: isOpen && !!selectedPaymentReport,
		},
	);

	return (
		<Modal open={isOpen} onCancel={onClose} footer={null} width={700}>
			<div className="p-6">
				<PaymentReportDetailHeader
					selectedPaymentReport={selectedPaymentReport}
					detailTransaction={detailTransaction}
				/>

				{isTransaction && (
					<>
						<PaymentReportOrderList orderDetail={OrderDetail} />
						<PaymentReportSummary dataPayment={dataPayment} />
					</>
				)}

				{isTransaction ? (
					<PaymentReportMDRDetail paymentReportDetail={paymentReportDetail} />
				) : (
					<PaymentReportWithdrawDetail
						paymentReportDetail={paymentReportDetail}
					/>
				)}
			</div>
		</Modal>
	);
};

export default PaymentReportDetail;
