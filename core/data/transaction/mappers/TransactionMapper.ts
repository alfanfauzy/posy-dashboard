import {QrCode} from '@/domain/qr-code/model';
import {
	Transaction,
	Transactions,
	TransactionSummary,
} from '@/domain/transaction/model';
import {
	CreateApplyDiscountBasedInput,
	CreateApplyDiscountInput,
} from '@/domain/transaction/repositories/CreateApplyDiscountRepository';
import {PaymentSummary} from '@/domain/transaction/repositories/GetPaymentSummaryRepository';
import {UpdateTransactionInput} from '@/domain/transaction/repositories/TransactionRepository';
import {Metadata} from '@/domain/vo/BaseMetadata';
import {ValidationSchemaApplyDiscountType} from '@/view/transaction/schemas/apply-discount';
import {ValidationSchemaUpdateTransactionType} from '@/view/transaction/schemas/update-transaction';

import {
	CreateTransactionDataResponse,
	GetTransactionDataResponse,
	GetTransactionsDataResponse,
	GetTransactionSummaryDataResponse,
	UpdateTransactionDataResponse,
} from '../types';
import {CreateCancelTransactionDataResponse} from '../types/CreateCancelTransactionType';
import {GetPaymentSummaryDataResponse} from '../types/GetPaymentSummaryType';

// map server data to own model
export const mapToTransactionsModel = (
	datas: Array<GetTransactionsDataResponse>,
): Transactions =>
	datas.map(data => ({
		uuid: data.uuid,
		created_at: data.created_at.seconds,
		paid_at: data.paid_at.seconds,
		first_order_at: data.first_order_at.seconds,
		updated_at: data.updated_at.seconds,
		customer_name: data.customer_name,
		is_open: data.is_open,
		is_order: data.is_order,
		is_paid: data.is_paid,
		staff: data.staff,
		status: data.status,
		table_number: data.table_number,
		table_uuid: data.restaurant_outlet_table_uuid,
		total_order: data.total_order,
		total_pax: data.total_pax,
		transaction_code: data.transaction_code,
	}));

export const mapToTransactionModel = (
	data: GetTransactionDataResponse,
): Transaction => ({
	uuid: data.uuid,
	created_at: data.created_at.seconds,
	paid_at: data.paid_at.seconds,
	first_order_at: data.first_order_at.seconds,
	updated_at: data.updated_at.seconds,
	customer_name: data.customer_name,
	is_open: data.is_open,
	is_order: data.is_order,
	is_paid: data.is_paid,
	staff: data.staff,
	status: data.status,
	table_number: data.table_number,
	table_uuid: data.restaurant_outlet_table_uuid,
	total_order: data.total_order,
	total_pax: data.total_pax,
	transaction_code: data.transaction_code,
});

export const mapToCreateTransactionModel = (
	data: CreateTransactionDataResponse,
): QrCode => ({
	uuid: data.uuid,
	base64_qrcode: data.qrcode.base64_qrcode,
	qrcode_url: data.qrcode.qrcode_url,
	transaction_code: data.qrcode.transaction_code,
	nanos: data.created_at.nanos,
	seconds: data.created_at.seconds,
});

export const mapToTransactionSummaryModel = (
	data: GetTransactionSummaryDataResponse,
): TransactionSummary => ({
	waiting_payment: data.waiting_payment,
	available_capacity: data.available_capacity,
	table_capacity: data.table_capacity,
	waiting_order: data.waiting_order,
});

export const mapToUpdateTransactionModel = (
	data: UpdateTransactionDataResponse,
): {uuid: string; updated_at: number} => ({
	uuid: data.uuid,
	updated_at: data.updated_at.seconds,
});

export const mapToUpdateTransactionPayload = (
	data: ValidationSchemaUpdateTransactionType & {transaction_uuid: string},
): UpdateTransactionInput => ({
	customer_name: data.customer_name,
	restaurant_outlet_table_uuid: data.restaurant_outlet_table_uuid.value,
	total_pax: Number(data.total_pax),
	transaction_category: data.transaction_category.value,
	transaction_uuid: data.transaction_uuid,
});

export const mapToCreateCancelTransactionModel = (
	data: CreateCancelTransactionDataResponse,
): {uuid: string; metadata: Metadata} => ({
	uuid: data.uuid,
	metadata: {
		cancel_at: data.cancel_at.seconds,
	},
});

export const mapToPaymentSummaryModel = (
	data: GetPaymentSummaryDataResponse,
): PaymentSummary => ({
	discount_general_percentage: data.discount_general_percentage,
	discount_general_price: data.discount_general_price,
	discount_product_price: data.discount_product_price,
	payment_price: data.payment_price,
	subtotal_price: data.subtotal_price,
	tax_and_charge: {
		service_charge_price: data.tax_and_charge.service_charge_price,
		tax_and_charge_price: data.tax_and_charge.tax_and_charge_price,
		tax_price: data.tax_and_charge.tax_price,
		tax_percentage: data.tax_and_charge.tax_percentage,
		is_service_charge_taxable: data.tax_and_charge.is_service_charge_taxable,
		is_tax: data.tax_and_charge.is_tax,
		is_service_charge: data.tax_and_charge.is_service_charge,
		service_charge_percentage: data.tax_and_charge.service_charge_percentage,
		tax_type: data.tax_and_charge.tax_type,
	},
});

export const mapToCreateApplyDiscountModel = (
	data: CreateCancelTransactionDataResponse,
): {uuid: string; metadata: Metadata} => ({
	uuid: data.uuid,
	metadata: {
		cancel_at: data.cancel_at.seconds,
	},
});

export const mapToCreateApplyDiscountPayload = (
	payload: ValidationSchemaApplyDiscountType & CreateApplyDiscountBasedInput,
): CreateApplyDiscountInput => ({
	discount_percentage: Number(payload.discount_percentage),
	transaction_uuid: payload.transaction_uuid,
	restaurant_outlet_uuid: payload.restaurant_outlet_uuid,
});
