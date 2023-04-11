import {UpdatedAt} from '@/data/common/types/metadata';
import {Order} from '@/domain/order/model';

enum TransactionStatus {
	WAITING_ORDER = 'WAITING_ORDER',
	WAITING_PAYMENT = 'WAITING_PAYMENT',
	WAITING_FOOD = 'WAITING_FOOD',
	PAID = 'PAID',
	CANCELLED = 'CANCELLED',
}

enum TransactionCategory {
	DINE_IN = 'DINE_IN',
	TAKE_AWAY = 'TAKE_AWAY',
}

type GetTransactionsDataResponseBased = {
	uuid: string;
	restaurant_outlet_uuid: string;
	restaurant_outlet_table_uuid: string;
	total_pax: number;
	total_order: number;
	price_base: number;
	price_tax: number;
	price_discount: number;
	price_after_discount: number;
	price_final: number;
	status: TransactionStatus;
	transaction_code: string;
	session_suffix: string;
	transaction_category: TransactionCategory;
	customer_name: string;
	customer_phone: string;
	customer_email: string;
	created_at: {
		seconds: number;
		nanos: number;
	};
	updated_at: {
		seconds: number;
		nanos: number;
	};
	first_order_at: {
		seconds: number;
	};
	paid_at: {
		seconds: number;
	};
	is_open: boolean;
	is_order: boolean;
	is_paid: boolean;
	staff: string;
	table_number: string;
	restaurant_uuid: string;
	restaurant_name: string;
	restaurant_email: string;
	restaurant_outlet_name: string;
	total_order_qty: number;
	total_price_base: number;
	total_price_tax: number;
	total_price_discount: number;
	total_price_after_discount: number;
	total_price_final: number;
	payment_method_uuid: string;
	payment_method_name: string;
	cashier_by: string;
	served_by: string;
	time_spent: number;
};

export type GetTransactionsDataResponse = GetTransactionsDataResponseBased;

export type GetTransactionDataResponse = {
	orders?: Array<Order>;
} & GetTransactionsDataResponseBased;

export type CreateTransactionDataResponse = {
	uuid: string;
	qrcode: {
		base64_qrcode: string;
		qrcode_url: string;
		transaction_code: string;
		outlet_name: string;
		logo: string;
		restaurant_name: string;
	};
	created_at: {
		seconds: number;
		nanos: number;
	};
};

export type GetTransactionSummaryDataResponse = {
	waiting_order: number;
	waiting_payment: number;
	table_capacity: number;
	available_capacity: number;
};

export type UpdateTransactionDataResponse = {
	uuid: string;
	updated_at: UpdatedAt;
};
