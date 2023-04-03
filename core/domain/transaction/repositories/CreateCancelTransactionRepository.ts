import {Metadata} from '@/domain/vo/BaseMetadata';
import {ResultMutation} from '@/domain/vo/BaseResponse';

export type CreateCancelTransactionInput = {
	transaction_uuid: string;
	restaurant_outlet_uuid: string;
};

export type CreateCancelTransactionResult = ResultMutation<
	{uuid: string; metadata: Metadata} | undefined
>;

export type CreateCancelTransactionRepository = {
	createCancelTransaction(input: CreateCancelTransactionInput): void;
} & CreateCancelTransactionResult;
