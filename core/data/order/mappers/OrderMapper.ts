import {Orders} from '@/domain/order/model';
import {CreatePrintOrderToKitchenModel} from '@/domain/order/repositories/CreatePrintOrderToKitchenRepository';
import {Metadata} from '@/domain/vo/BaseMetadata';

import {CreateOrderManualDataResponse, GetOrdersDataResponse} from '../types';
import {CreatePrintOrderToKitchenDataResponse} from '../types/CreatePrintToKitchenType';

// map server data to own model
export const mapToOrdersModel = (datas: Array<GetOrdersDataResponse>): Orders =>
	datas.map(data => ({
		uuid: data.uuid,
		order_qty: data.order_qty,
		price_discount: data.price_discount,
		price_after_discount: data.price_after_discount,
		price_final: data.price_final,
		total_product: data.total_product,
		is_printed: data.is_printed,
		total_print_kitchen: data.total_print_kitchen,
		total_served: data.total_served,
		total_cancel: data.total_cancel,
		total_done: data.total_done,
		first_print_at: data.first_print_at.seconds,
		status: data.status,
		metadata: {
			created_at: data.metadata.created_at.seconds,
		},
		order_detail: data.order_detail,
	}));

export const mapToCreateOrderManualModel = (
	data: CreateOrderManualDataResponse,
): {uuid: string; metadata: Metadata} => ({
	uuid: data.uuid,
	metadata: {
		created_at: data.metadata.created_at.seconds,
	},
});

export const mapToCreatePrintOrderToKitchenModel = (
	data: CreatePrintOrderToKitchenDataResponse,
): CreatePrintOrderToKitchenModel => ({
	customer_name: data.customer_name,
	table_name: data.table_name,
	transaction_category: data.transaction_category,
	transaction_code: data.transaction_code,
	orders: data.orders,
});
