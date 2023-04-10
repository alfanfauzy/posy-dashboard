import {Metadata} from '@/domain/vo/BaseMetadata';
import {ResultMutation} from '@/domain/vo/BaseResponse';

export type CreateCancelTransactionInput = {
	transaction_uuid: string;
	restaurant_outlet_uuid: string;
};

export type CancelTransaction = {uuid: string; metadata: Metadata};

export type CreateCancelTransactionResult = ResultMutation<
	CancelTransaction | undefined
>;

export type CreateCancelTransactionRepository = {
	createCancelTransaction(input: CreateCancelTransactionInput): void;
} & CreateCancelTransactionResult;
