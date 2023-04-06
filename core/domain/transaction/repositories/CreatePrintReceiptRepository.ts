import {ResultMutation} from '@/domain/vo/BaseResponse';

import {TransactionStatus} from '../model';
import {PaymentSummary} from './GetPaymentSummaryRepository';

export type CreatePrintReceiptInput = {
	transaction_uuid: string;
	restaurant_outlet_uuid: string;
};

export type Receipt = {
	logo_image_url: string;
	restaurant_code: string;
	restaurant_name: string;
	restaurant_outlet_code: string;
	transaction_category: string;
	table_number: string;
	total_pax: number;
	transaction_code: string;
	customer_name: string;
	cashier_by: string;
	served_by: string;
	created_at: number;
	paid_at: number;
	items: Array<Item>;
	paid_amount: number;
	change_amount: number;
	payment_method_uuid: string;
	payment_method_name: string;
	payment_method_category_uuid: string;
	payment_method_category_name: string;
	payment_summary: PaymentSummary;
	status: TransactionStatus;
};

export type Item = {
	name: string;
	price: number;
	qty: number;
	subtotal_price: number;
};

export type CreatePrintReceiptResult = ResultMutation<Receipt | undefined>;

export type CreatePrintReceiptRepository = {
	createPrintReceipt(input: CreatePrintReceiptInput): void;
} & CreatePrintReceiptResult;
