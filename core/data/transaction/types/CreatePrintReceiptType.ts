import {CreatedAt, PaidAt} from '@/data/common/types/metadata';

type TaxType = 'TAX_AFTER_DISCOUNT' | 'TAX_INCLUDE_PRICE';

enum TransactionStatus {
	WAITING_ORDER = 'WAITING_ORDER',
	WAITING_PAYMENT = 'WAITING_PAYMENT',
	WAITING_FOOD = 'WAITING_FOOD',
	PAID = 'PAID',
	CANCELLED = 'CANCELLED',
}

export type CreatePrintReceiptDataResponse = {
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
	created_at: CreatedAt;
	paid_at: PaidAt;
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

export type PaymentSummary = {
	subtotal_price: number;
	discount_product_price: number;
	discount_general_percentage: number;
	discount_general_price: number;
	tax_and_charge: TaxAndCharge;
	payment_price: number;
};

export type TaxAndCharge = {
	is_service_charge: boolean;
	service_charge_percentage: number;
	is_service_charge_taxable: boolean;
	service_charge_price: number;
	is_tax: boolean;
	tax_type: TaxType;
	tax_percentage: number;
	tax_price: number;
	tax_and_charge_price: number;
};
