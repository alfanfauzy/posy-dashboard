import {Metadata} from '@/domain/vo/BaseMetadata';
import {ResultMutation} from '@/domain/vo/BaseResponse';

export type CreateCancelOrderInput = {
	restaurant_outlet_uuid: string;
	transaction_uuid: string;
	order: Array<{
		uuid: string;
		order_detail: Array<{
			uuid: string;
			cancel_reason_status: string;
			cancel_reason_other?: string;
		}>;
	}>;
};

export type CancelOrder = {uuid: string; metadata: Metadata};

export type CreateCancelOrderResult = ResultMutation<CancelOrder | undefined>;

export type CreateCancelOrderRepository = {
	createCancelOrder(input: CreateCancelOrderInput): void;
} & CreateCancelOrderResult;
