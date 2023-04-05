import {
	CreatedAt,
	FirstOrderAt,
	PaidAt,
	UpdatedAt,
} from '@/data/common/types/metadata';

export type GetTransactionReportsDataResponse = {
	uuid: string;
	restaurant_uuid: string;
	restaurant_name: string;
	restaurant_email: string;
	restaurant_outlet_uuid: string;
	restaurant_outlet_name: string;
	restaurant_outlet_table_uuid: string;
	table_number: string;
	total_pax: number;
	total_order: number;
	total_price_base: number;
	total_price_tax: number;
	total_price_discount: number;
	total_price_after_discount: number;
	total_price_final: number;
	status: string;
	is_paid: boolean;
	is_open: boolean;
	transaction_code: string;
	session_suffix: string;
	transaction_category: string;
	customer_name: string;
	customer_phone: string;
	customer_email: string;
	payment_method_uuid: string;
	payment_method_name: string;
	cashier_by: string;
	served_by: string;
	created_at: CreatedAt;
	updated_at: UpdatedAt;
	first_order_at: FirstOrderAt;
	paid_at: PaidAt;
};
