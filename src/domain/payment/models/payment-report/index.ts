import {ResultInfinite} from '@/domain/vo/BaseResponse';

export type PaymentReportList = {
	id: string;
	transaction_id: string;
	date: string;
	outlet: string;
	category: string;
	payment_method: string;
	ammount_received: number;
	setlement_status: string;
	currency: string;
	amount: number;
	fee: number;
	reference_id: string;
	fee_detail: {
		charge_fee: number;
		charge_fee_unit: 'percent' | 'flat';
		charge_amount: number;
		vat_amount: number;
	};
	net_amount: number;
	cashflow: string;
	status: string;
	settlement_status: string;
	estimated_settlement_time: string;
};

type PaymentReportBased = {
	hasMore: boolean;
	link: string;
	data: Array<PaymentReportList>;
};

export type PaymentsReport = PaymentReportBased;

export type GetPaymentReportsResult = ResultInfinite<
	PaymentsReport | undefined
>;
