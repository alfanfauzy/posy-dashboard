export type CreatePrintOrderToKitchenDataResponse = {
	transaction_code: string;
	transaction_category: string;
	customer_name: string;
	table_name: string;
	orders: Array<Order>;
};

export type Order = {
	uuid: string;
	order_qty: number;
	total_product: number;
	total_print_kitchen: number;
	note: string;
	order_detail: Array<OrderDetail>;
};

export type OrderDetail = {
	product_name: string;
	qty: number;
	order_note: string;
	addon_information: Array<AddonInformation>;
};

export type AddonInformation = {
	addon_name: string;
	addon_price: number;
	addon_variants: Array<AddonVariant>;
};

export type AddonVariant = {
	variant_name: string;
	variant_price: number;
};
