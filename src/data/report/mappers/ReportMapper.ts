import {ReportSummary, Reports} from '@/domain/report/model';

import {GetTransactionReportsDataResponse} from '../types/GetTransactionReportsType';
import {GetTransactionReportSummaryDataResponse} from '../types/GetTransactionReportSummaryType';

export const mapToTransactionReportsModel = (
	datas: Array<GetTransactionReportsDataResponse>,
): Reports =>
	datas.map(data => ({
		uuid: data.uuid,
		cashier_by: data.cashier_by,
		created_at: data.created_at.seconds,
		payment_method_uuid: data.payment_method_uuid,
		payment_method_name: data.payment_method_name,
		restaurant_email: data.restaurant_email,
		restaurant_name: data.restaurant_name,
		restaurant_outlet_name: data.restaurant_outlet_name,
		restaurant_outlet_table_uuid: data.restaurant_outlet_table_uuid,
		restaurant_outlet_uuid: data.restaurant_outlet_uuid,
		restaurant_uuid: data.restaurant_uuid,
		served_by: data.served_by,
		session_suffix: data.session_suffix,
		status: data.status,
		table_number: data.table_number,
		total_order: data.total_order,
		total_pax: data.total_pax,
		total_price_after_discount: data.total_price_after_discount,
		total_price_base: data.total_price_base,
		total_price_discount: data.total_price_discount,
		total_price_final: data.total_price_final,
		total_price_tax: data.total_price_tax,
		transaction_category: data.transaction_category,
		transaction_code: data.transaction_code,
		updated_at: data.updated_at.seconds,
		customer_email: data.customer_email,
		customer_name: data.customer_name,
		customer_phone: data.customer_phone,
		first_order_at: data.first_order_at.seconds,
		is_open: data.is_open,
		is_paid: data.is_paid,
		paid_at: data.paid_at.seconds,
		total_order_qty: data.total_order_qty,
		time_spent: data.time_spent,
	}));

export const mapToTransactionReportSummaryModel = (
	data: GetTransactionReportSummaryDataResponse,
): ReportSummary => ({
	most_selling_product: data.most_selling_product,
	total_price_transaction: data.total_price_transaction,
	total_transaction: data.total_transaction,
	total_order_qty: data.total_order_qty,
});
