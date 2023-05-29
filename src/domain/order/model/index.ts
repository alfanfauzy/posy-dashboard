import {Metadata} from '@/domain/vo/BaseMetadata';

export enum OrderStatus {
	ORDER_NOT_SELECTED = '0',
	ORDER_NEED_TO_PRINT = '1',
	ORDER_ON_KITCHEN = '2',
	ORDER_SERVED = '3',
	ORDER_CANCELLED = '4',
}

export enum OrderDetailStatus {
	NOT_SELECTED = '0',
	NEED_TO_PRINT = '1',
	ON_KITCHEN = '2',
	SERVED = '3',
	CANCEL = '4',
}

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
	cancel_reason_other: string;
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
	order_number: string;
};

export type Order = OrderBased;

export type Orders = Array<OrderBased>;
