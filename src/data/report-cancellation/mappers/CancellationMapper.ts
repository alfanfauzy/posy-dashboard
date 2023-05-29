import {
	CancellationReports,
	CancellationSummary,
} from '@/domain/report-cancellation/model';

import {GetCancellationReportsDataResponse} from '../types/GetCancellationReportsType';
import {GetCancellationReportSummaryDataResponse} from '../types/GetCancellationReportSummaryType';

export const mapToCancellationReportModel = (
	datas: Array<GetCancellationReportsDataResponse>,
): CancellationReports =>
	datas.map(data => ({
		uuid: data.uuid,
		transaction_code: data.transaction_code,
		transaction_uuid: data.transaction_uuid,
		outlet_name: data.outlet_name,
		transaction_start: data.transaction_start,
		transaction_close: data.transaction_close,
		order_time: data.order_time,
		cashier: data.cashier,
		waiter: data.waiter,
		cancel_reason: data.cancel_reason,
		cancel_reason_other: data.cancel_reason_other,
		outlet_uuid: data.outlet_uuid,
		order_uuid: data.order_uuid,
		product_uuid: data.product_uuid,
		price_base: data.price_base,
		price_discount: data.price_discount,
		price_after_discount: data.price_after_discount,
		price_base_final: data.price_base_final,
		price_addon: data.price_addon,
		price_final: data.price_final,
		qty: data.qty,
		price_subtotal: data.price_subtotal,
		addon_information: data.addon_information,
		order_note: data.order_note,
		status: data.status,
	}));

export const mapToCancellationReportSummaryModel = (
	data: GetCancellationReportSummaryDataResponse,
): CancellationSummary => ({
	customer_cancellation: data.customer_cancellation,
	long_waiting: data.long_waiting,
	others: data.others,
	out_of_stock: data.out_of_stock,
	wrong_order: data.wrong_order,
});
