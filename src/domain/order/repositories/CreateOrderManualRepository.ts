import {Metadata} from '@/domain/vo/BaseMetadata';
import {ResultMutation} from '@/domain/vo/BaseResponse';

type AddOnInput = {
	uuid: string;
};

type Orderinput = {
	product_uuid: string;
	qty: number;
	order_note?: string;
	addon?: Array<AddOnInput>;
};

export type CreateOrderManualInput = {
	transaction_uuid: string;
	restaurant_outlet_uuid: string;
	order: Array<Orderinput>;
};

export type CreateOrderManualResult = ResultMutation<
	{uuid: string; metadata: Metadata} | undefined
>;

export type CreateOrderManualRepository = {
	createOrderManual(input: CreateOrderManualInput): void;
} & CreateOrderManualResult;
