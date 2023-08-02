import {ResultQuery} from '@/domain/vo/BaseResponse';

import {PaymentReportDetail} from '../models/payment-report/GetPaymentReportDetailModel';

export type GetPaymentReportDetailPayload = {
	restaurant_outlet_uuid: string;
	transaction_id: string;
};

export type GetPaymentReportDetailResult = ResultQuery<
	PaymentReportDetail | undefined
>;
