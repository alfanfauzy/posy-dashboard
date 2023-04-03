import {Metadata} from '@/domain/vo/BaseMetadata';
import {ResultMutation} from '@/domain/vo/BaseResponse';

export type CreateCancelOrderInput = {
	is_all: boolean;
	order_uuid: string;
	order_detail_uuid: string;
	reason: string;
	restaurant_outlet_uuid: string;
};

export type CreateCancelOrderResult = ResultMutation<
	{uuid: string; metadata: Metadata} | undefined
>;

export type CreateCancelOrderRepository = {
	createCancelOrder(input: CreateCancelOrderInput): void;
} & CreateCancelOrderResult;
