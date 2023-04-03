import {Metadata} from '@/domain/vo/BaseMetadata';
import {ResultMutation} from '@/domain/vo/BaseResponse';

export type CreateServeOrderInput = {
	order_uuid: string;
	order_detail_uuid: string;
	restaurant_outlet_uuid: string;
};

export type CreateServeOrderResult = ResultMutation<
	{uuid: string; metadata: Metadata} | undefined
>;

export type CreateServeOrderRepository = {
	createServeOrder(input: CreateServeOrderInput): void;
} & CreateServeOrderResult;
