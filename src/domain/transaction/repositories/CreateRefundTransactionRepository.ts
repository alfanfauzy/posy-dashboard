import {Metadata} from '@/domain/vo/BaseMetadata';
import {ResultMutation} from '@/domain/vo/BaseResponse';
import {ValidationSchemaRefundType} from '@/view/history/schemas/RefundSchema';

export type CreateRefundTransactionInput = {
	restaurant_outlet_uuid: string;
	authorization_user_uuid: string;
	authorization_credential: string;
	transaction_uuid: string;
};

export type CreateRefundTransactionBasedInput = {
	restaurant_outlet_uuid: string;
	transaction_uuid: string;
};

export type RefundTransaction = {uuid: string; metadata: Metadata};

export type CreateRefundTransactionResult = ResultMutation<
	RefundTransaction | undefined
>;

export type CreateRefundTransactionRepository = {
	createRefundTransaction(
		input: ValidationSchemaRefundType & CreateRefundTransactionBasedInput,
	): void;
} & CreateRefundTransactionResult;
