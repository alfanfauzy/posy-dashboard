/* eslint-disable no-shadow */
export enum TransactionStatus {
	WAITING_ORDER = 'WAITING_ORDER',
	WAITING_PAYMENT = 'WAITING_PAYMENT',
	WAITING_FOOD = 'WAITING_FOOD',
	PAID = 'PAID',
	CANCELLED = 'CANCELLED',
}

export enum TransactionCategory {
	DINE_IN = 'DINE_IN',
	TAKE_AWAY = 'TAKE_AWAY',
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
	customer_name: string;
	staff: string;
};

export type Transaction = TransactionBased;

export type Transactions = Array<TransactionBased>;

export type TransactionSummary = {
	waiting_order: number;
	waiting_payment: number;
	table_capacity: number;
	available_capacity: number;
};
