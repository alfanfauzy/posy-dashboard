import {Metadata} from '@/data/common/types/metadata';

enum OrderStatus {
	ORDER_RECEIVED = 'ORDER_RECEIVED',
	ORDER_PROCESS = 'ORDER_PROCESS',
	ORDER_SERVED = 'ORDER_SERVED',
	ORDER_CANCELLED = 'ORDER_CANCELLED',
}

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
	addon_information: [];
	order_note: string;
	status: OrderStatus;
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
};

export type GetOrdersDataResponse = GetOrdersDataResponseBased;

export type CreateOrderManualDataResponse = {
	uuid: string;
	metadata: Metadata;
};

export type CreatePrintOrderToKitchenDataResponse = {
	uuid: string;
	metadata: Metadata;
};
