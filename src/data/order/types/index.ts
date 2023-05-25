import {Metadata} from '@/data/common/types/metadata';

enum OrderStatus {
	ORDER_NOT_SELECTED,
	ORDER_NEED_TO_PRINT,
	ORDER_ON_KITCHEN,
	ORDER_SERVED,
	ORDER_CANCELLED,
}

enum OrderDetailStatus {
	NOT_SELECTED,
	NEED_TO_PRINT,
	ON_KITCHEN,
	SERVED,
	CANCEL,
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

type OrderDetail = {
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

type GetOrdersDataResponseBased = {
	uuid: string;
	order_qty: number;
	price_base: number;
	price_discount: number;
	price_after_discount: number;
	price_final: number;
	status: OrderStatus;
	total_product: number;
	is_printed: false;
	total_print_kitchen: number;
	total_served: number;
	total_cancel: number;
	total_done: number;
	first_print_at: {
		seconds: number;
	};
	metadata: Metadata;
	order_detail: Array<OrderDetail>;
	order_number: string;
};

export type GetOrdersDataResponse = GetOrdersDataResponseBased;

export type CreateOrderManualDataResponse = {
	uuid: string;
	metadata: Metadata;
};
