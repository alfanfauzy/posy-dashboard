import {Metadata} from '@/domain/vo/BaseMetadata';

type OrderStatus =
	| 'ORDER_RECEIVED'
	| 'ORDER_PROCESS'
	| 'ORDER_SERVED'
	| 'ORDER_CANCELLED';

type OrderDetailStatus = 'RECEIVED' | 'PROCESS' | 'SERVED' | 'CANCEL';

type AddonInformation = {
	addon_name: string;
	addon_price: number;
	addon_variants: Array<AddonVariant>;
};

type AddonVariant = {
	variant_name: string;
	variant_price: number;
};

export type OrderDetail = {
	uuid: string;
	product_uuid: string;
	product_name: string;
	product_image: string;
	product_image_url: string;
	price_base: number;
	price_discount: number;
	price_after_discount: number;
	price_base_final: number;
	price_addon: number;
	price_final: number;
	qty: number;
	price_subtotal: number;
	addon_information: Array<AddonInformation>;
	order_note: string;
	status: OrderDetailStatus;
	cancel_reason: string;
};

type OrderBased = {
	uuid: string;
	order_qty: number;
	price_discount: number;
	price_after_discount: number;
	price_final: number;
	status: OrderStatus;
	total_product: number;
	is_printed: boolean;
	total_print_kitchen: number;
	total_served: number;
	total_cancel: number;
	total_done: number;
	first_print_at: number;
	metadata: Metadata;
	order_detail: Array<OrderDetail>;
};

export type Order = OrderBased;

export type Orders = Array<OrderBased>;
