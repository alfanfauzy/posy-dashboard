import {ResultMutation} from '@/domain/vo/BaseResponse';

import {Order, OrderDetail} from '../model';

export type CreatePrintOrderToKitchenInput = {
	transaction_uuid: string;
	restaurant_outlet_uuid: string;
	order_uuids: Array<string>;
};

export type CreatePrintOrderToKitchenModel = {
	transaction_code: string;
	transaction_category: string;
	customer_name: string;
	table_name: string;
	orders: Array<
		Pick<
			Order,
			'uuid' | 'order_qty' | 'total_product' | 'total_print_kitchen'
		> & {
			order_detail: Array<
				Pick<
					OrderDetail,
					'product_name' | 'qty' | 'order_note' | 'addon_information'
				>
			>;
		} & {
			note: string;
		}
	>;
};

export type CreatePrintOrderToKitchenResult = ResultMutation<
	CreatePrintOrderToKitchenModel | undefined
>;

export type CreatePrintOrderToKitchenRepository = {
	createPrintOrderToKitchen(input: CreatePrintOrderToKitchenInput): void;
} & CreatePrintOrderToKitchenResult;
