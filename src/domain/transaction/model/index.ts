/* eslint-disable no-shadow */
export enum TransactionStatus {
	WAITING_ORDER = 'WAITING_ORDER',
	WAITING_PAYMENT = 'WAITING_PAYMENT',
	WAITING_FOOD = 'WAITING_FOOD',
	PAID = 'PAID',
	CANCELLED = 'CANCELLED',
	REFUND = 'REFUND',
}

export enum TransactionCategory {
	DINE_IN = 'DINE_IN',
	TAKE_AWAY = 'TAKE_AWAY',
}

export enum CancelReason {
	OUT_OF_STOCK = 'OUT_OF_STOCK',
	CUSTOMER_CANCELLATION = 'CUSTOMER_CANCELLATION',
	LONG_WAITING = 'LONG_WAITING',
	WRONG_ORDER = 'WRONG_ORDER',
	OTHER = 'OTHER',
}

type TransactionBased = {
	uuid: string;
	transaction_code: string;
	table_uuid: string;
	table_number: string;
	total_pax: number;
	total_order: number;
	status: TransactionStatus;
	is_open: boolean;
	is_order: boolean;
	is_paid: boolean;
	created_at: number;
	updated_at: number;
	first_order_at: number;
	paid_at: number;
	staff: string;
	customer_email: string;
	customer_name: string;
	customer_phone: string;
	transaction_category: TransactionCategory;
	restaurant_uuid: string;
	restaurant_name: string;
	restaurant_email: string;
	restaurant_outlet_uuid: string;
	restaurant_outlet_name: string;
	restaurant_outlet_table_uuid: string;
	total_order_qty: number;
	total_price_base: number;
	total_price_tax: number;
	total_price_discount: number;
	total_price_after_discount: number;
	total_price_final: number;
	session_suffix: string;
	payment_method_uuid: string;
	payment_method_name: string;
	cashier_by: string;
	served_by: string;
	time_spent: number;
	need_print_to_kitchen: boolean;
};

export type Transaction = TransactionBased;

export type Transactions = Array<TransactionBased>;

export type TransactionSummary = {
	waiting_order: number;
	waiting_food: number;
	waiting_payment: number;
	table_capacity: number;
	available_capacity: number;
};
