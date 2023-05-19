import {QrCode} from '@/domain/qr-code/model';
import {
	Transaction,
	Transactions,
	TransactionSummary,
} from '@/domain/transaction/model';
import {
	ApplyDiscount,
	CreateApplyDiscountBasedInput,
	CreateApplyDiscountInput,
} from '@/domain/transaction/repositories/CreateApplyDiscountRepository';
import {CancelTransaction} from '@/domain/transaction/repositories/CreateCancelTransactionRepository';
import {MakePayment} from '@/domain/transaction/repositories/CreateMakePaymentRepository';
import {Receipt} from '@/domain/transaction/repositories/CreatePrintReceiptRepository';
import {
	CreateRefundTransactionBasedInput,
	CreateRefundTransactionInput,
	RefundTransaction,
} from '@/domain/transaction/repositories/CreateRefundTransactionRepository';
import {PaymentSummary} from '@/domain/transaction/repositories/GetPaymentSummaryRepository';
import {TableStatus} from '@/domain/transaction/repositories/GetTableStatusRepository';
import {
	UpdateTransaction,
	UpdateTransactionInput,
	UpdateTransactionInputBased,
} from '@/domain/transaction/repositories/UpdateTransactionRepository';
import {ValidationSchemaRefundType} from '@/view/history/schemas/RefundSchema';
import {ValidationSchemaApplyDiscountType} from '@/view/transaction/schemas/apply-discount';
import {ValidationSchemaUpdateTransactionType} from '@/view/transaction/schemas/update-transaction';

import {
	CreateTransactionDataResponse,
	GetTransactionDataResponse,
	GetTransactionsDataResponse,
	GetTransactionSummaryDataResponse,
	UpdateTransactionDataResponse,
} from '../types';
import {CreateApplyDiscountDataResponse} from '../types/CreateApplyDiscountType';
import {CreateCancelTransactionDataResponse} from '../types/CreateCancelTransactionType';
import {CreateMakePaymentDataResponse} from '../types/CreateMakePaymentType';
import {CreatePrintReceiptDataResponse} from '../types/CreatePrintReceiptType';
import {CreateRefundTransactionDataResponse} from '../types/CreateRefundTransactionType';
import {GetPaymentSummaryDataResponse} from '../types/GetPaymentSummaryType';
import {GetQrCodeDataResponse} from '../types/GetQrCodeType';
import {GetTableStatusDataResponse} from '../types/GetTableStatusType';

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
		customer_email: data.customer_email,
		customer_phone: data.customer_phone,
		transaction_category: data.transaction_category,
		cashier_by: data.cashier_by,
		payment_method_name: data.payment_method_name,
		payment_method_uuid: data.payment_method_uuid,
		restaurant_email: data.restaurant_email,
		restaurant_name: data.restaurant_name,
		restaurant_uuid: data.restaurant_uuid,
		restaurant_outlet_name: data.restaurant_outlet_name,
		restaurant_outlet_uuid: data.restaurant_outlet_uuid,
		restaurant_outlet_table_uuid: data.restaurant_outlet_table_uuid,
		served_by: data.served_by,
		session_suffix: data.session_suffix,
		time_spent: data.time_spent,
		total_order_qty: data.total_order_qty,
		total_price_after_discount: data.total_price_after_discount,
		total_price_base: data.total_price_base,
		total_price_discount: data.total_price_discount,
		total_price_final: data.total_price_final,
		total_price_tax: data.total_price_tax,
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
	customer_email: data.customer_email,
	customer_phone: data.customer_phone,
	transaction_category: data.transaction_category,
	cashier_by: data.cashier_by,
	payment_method_name: data.payment_method_name,
	payment_method_uuid: data.payment_method_uuid,
	restaurant_email: data.restaurant_email,
	restaurant_name: data.restaurant_name,
	restaurant_uuid: data.restaurant_uuid,
	restaurant_outlet_name: data.restaurant_outlet_name,
	restaurant_outlet_uuid: data.restaurant_outlet_uuid,
	restaurant_outlet_table_uuid: data.restaurant_outlet_table_uuid,
	served_by: data.served_by,
	session_suffix: data.session_suffix,
	time_spent: data.time_spent,
	total_order_qty: data.total_order_qty,
	total_price_after_discount: data.total_price_after_discount,
	total_price_base: data.total_price_base,
	total_price_discount: data.total_price_discount,
	total_price_final: data.total_price_final,
	total_price_tax: data.total_price_tax,
});

export const mapToCreateTransactionModel = (
	data: CreateTransactionDataResponse,
): QrCode => ({
	uuid: data.uuid,
	base64_qrcode: data.qrcode.base64_qrcode,
	qrcode_url: data.qrcode.qrcode_url,
	transaction_code: data.qrcode.transaction_code,
	seconds: data.created_at.seconds,
	logo: data.qrcode.logo,
	outlet_name: data.qrcode.outlet_name,
	restaurant_name: data.qrcode.restaurant_name,
});

export const mapToTransactionSummaryModel = (
	data: GetTransactionSummaryDataResponse,
): TransactionSummary => ({
	waiting_payment: data.waiting_payment,
	available_capacity: data.available_capacity,
	table_capacity: data.table_capacity,
	waiting_order: data.waiting_order,
	waiting_food: data.waiting_food,
});

export const mapToUpdateTransactionModel = (
	data: UpdateTransactionDataResponse,
): UpdateTransaction => ({
	uuid: data.uuid,
	updated_at: data.updated_at.seconds,
});

export const mapToUpdateTransactionPayload = (
	data: ValidationSchemaUpdateTransactionType & UpdateTransactionInputBased,
): UpdateTransactionInput => ({
	customer_name: data.customer_name,
	restaurant_outlet_table_uuid:
		data.restaurant_outlet_table_uuid && data.transaction_category.value === 0
			? data.restaurant_outlet_table_uuid
			: '',
	total_pax: Number(data.total_pax),
	transaction_category: data.transaction_category.value,
	transaction_uuid: data.transaction_uuid,
	restaurant_outlet_uuid: data.restaurant_outlet_uuid,
});

export const mapToCancelTransactionModel = (
	data: CreateCancelTransactionDataResponse,
): CancelTransaction => ({
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

export const mapToApplyDiscountModel = (
	data: CreateApplyDiscountDataResponse,
): ApplyDiscount => ({
	uuid: data.uuid,
	metadata: {
		updated_at: data.metadata.updated_at.seconds,
	},
});

export const mapToApplyDiscountPayload = (
	payload: ValidationSchemaApplyDiscountType & CreateApplyDiscountBasedInput,
): CreateApplyDiscountInput => ({
	discount_percentage: Number(payload.discount_percentage),
	transaction_uuid: payload.transaction_uuid,
	restaurant_outlet_uuid: payload.restaurant_outlet_uuid,
});

export const mapToMakePaymentModel = (
	data: CreateMakePaymentDataResponse,
): MakePayment => ({
	paid_amount: data.paid_amount,
	payment_method: data.payment_method,
	payment_method_category: data.payment_method_category,
	success: data.success,
	total_amount: data.total_amount,
	metadata: {
		updated_at: data.metadata.updated_at.seconds,
	},
	transaction_code: data.transaction_code,
});

export const mapToReceiptModel = (
	data: CreatePrintReceiptDataResponse,
): Receipt => ({
	logo_image_url: data.logo_image_url,
	restaurant_code: data.restaurant_code,
	restaurant_name: data.restaurant_name,
	restaurant_outlet_code: data.restaurant_outlet_code,
	transaction_category: data.transaction_category,
	table_number: data.table_number,
	total_pax: data.total_pax,
	transaction_code: data.transaction_code,
	customer_name: data.customer_name,
	cashier_by: data.cashier_by,
	served_by: data.served_by,
	created_at: data.created_at.seconds,
	paid_at: data.paid_at.seconds,
	items: data.items,
	paid_amount: data.paid_amount,
	change_amount: data.change_amount,
	payment_method_uuid: data.payment_method_uuid,
	payment_method_name: data.payment_method_name,
	payment_method_category_uuid: data.payment_method_category_uuid,
	payment_method_category_name: data.payment_method_category_name,
	payment_summary: {
		discount_general_percentage:
			data.payment_summary.discount_general_percentage,
		discount_general_price: data.payment_summary.discount_general_price,
		discount_product_price: data.payment_summary.discount_product_price,
		payment_price: data.payment_summary.payment_price,
		subtotal_price: data.payment_summary.subtotal_price,
		tax_and_charge: {
			service_charge_price:
				data.payment_summary.tax_and_charge.service_charge_price,
			tax_and_charge_price:
				data.payment_summary.tax_and_charge.tax_and_charge_price,
			tax_price: data.payment_summary.tax_and_charge.tax_price,
			tax_percentage: data.payment_summary.tax_and_charge.tax_percentage,
			is_service_charge_taxable:
				data.payment_summary.tax_and_charge.is_service_charge_taxable,
			is_tax: data.payment_summary.tax_and_charge.is_tax,
			is_service_charge: data.payment_summary.tax_and_charge.is_service_charge,
			service_charge_percentage:
				data.payment_summary.tax_and_charge.service_charge_percentage,
			tax_type: data.payment_summary.tax_and_charge.tax_type,
		},
	},
	status: data.status,
});

export const mapToRefundTransactionModel = (
	data: CreateRefundTransactionDataResponse,
): RefundTransaction => ({
	uuid: data.uuid,
	metadata: {
		created_at: data.metadata.created_at.seconds,
	},
});

export const mapToRefundTransactionPayload = (
	payload: ValidationSchemaRefundType & CreateRefundTransactionBasedInput,
): CreateRefundTransactionInput => ({
	authorization_user_uuid: payload.authorization_user_uuid.value,
	authorization_credential: payload.authorization_credential,
	restaurant_outlet_uuid: payload.restaurant_outlet_uuid,
	transaction_uuid: payload.transaction_uuid,
});

export const mapToQrCodeModel = (data: GetQrCodeDataResponse): QrCode => ({
	base64_qrcode: data.base64_qrcode,
	logo: data.logo,
	outlet_name: data.outlet_name,
	qrcode_url: data.qrcode_url,
	restaurant_name: data.restaurant_name,
	transaction_code: '',
	uuid: '',
	seconds: 0,
});

export const mapToTableStatusModel = (
	datas: Array<GetTableStatusDataResponse>,
): Array<TableStatus> =>
	datas.map(data => ({
		table_uuid: data.table_uuid,
		table_number: data.table_number,
		priority: data.priority,
		is_available: data.is_available,
	}));
