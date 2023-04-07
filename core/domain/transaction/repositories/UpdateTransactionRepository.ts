import {ResultMutation} from '@/domain/vo/BaseResponse';

export type UpdateTransactionInput = {
	restaurant_outlet_table_uuid: string;
	transaction_category: number;
	total_pax: number;
	customer_name: string;
	transaction_uuid: string;
};

export type UpdateTransaction = {uuid: string; updated_at: number};

export type UpdateTransactionResult = ResultMutation<
	UpdateTransaction | undefined
>;

export type UpdateTransactionRepository = {
	updateTransaction(input: UpdateTransactionInput): void;
} & UpdateTransactionResult;
