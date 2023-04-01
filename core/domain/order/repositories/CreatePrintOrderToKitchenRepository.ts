import {Metadata} from '@/domain/vo/BaseMetadata';
import {ResultMutation} from '@/domain/vo/BaseResponse';

export type CreatePrintOrderToKitchenInput = {
	transaction_uuid: string;
	restaurant_outlet_uuid: string;
	order_uuids: Array<string>;
};

export type CreatePrintOrderToKitchenResult = ResultMutation<
	{uuid: string; metadata: Metadata} | undefined
>;

export type CreatePrintOrderToKitchenRepository = {
	createPrintOrderToKitchen(input: CreatePrintOrderToKitchenInput): void;
} & CreatePrintOrderToKitchenResult;
