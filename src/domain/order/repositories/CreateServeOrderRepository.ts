import {Metadata} from '@/domain/vo/BaseMetadata';
import {ResultMutation} from '@/domain/vo/BaseResponse';

export type CreateServeOrderInput = {
	order_uuid: string;
	order_detail_uuid: string;
	restaurant_outlet_uuid: string;
	rollback_to_kitchen?: boolean;
};

export type ServeOrder = {uuid: string; metadata: Metadata};

export type CreateServeOrderResult = ResultMutation<ServeOrder | undefined>;

export type CreateServeOrderRepository = {
	createServeOrder(input: CreateServeOrderInput): void;
} & CreateServeOrderResult;
