import {ResultMutation} from '@/domain/vo/BaseResponse';
import {ValidationSchemaUpdateTransactionType} from '@/view/transaction/schemas/update-transaction';

export type UpdateTransactionInput = {
	restaurant_outlet_table_uuid: string;
	transaction_category: number;
	total_pax: number;
	customer_name: string;
} & UpdateTransactionInputBased;

export type UpdateTransactionInputBased = {
	transaction_uuid: string;
	restaurant_outlet_uuid: string;
};

export type UpdateTransaction = {uuid: string; updated_at: number};

export type UpdateTransactionResult = ResultMutation<
	UpdateTransaction | undefined
>;

export type UpdateTransactionRepository = {
	updateTransaction(
		input: ValidationSchemaUpdateTransactionType & UpdateTransactionInputBased,
	): void;
} & UpdateTransactionResult;
