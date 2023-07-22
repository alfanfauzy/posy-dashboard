import {
	Transaction,
	Transactions,
	TransactionSummary,
} from '@/domain/transaction/model';
import {FilterBased, InputVariables} from '@/domain/vo/BaseInput';
import {Pagination} from '@/domain/vo/BasePagination';
import {ResultQuery} from '@/domain/vo/BaseResponse';

/**
 * GET
 */

export type GetTransactionsInput = InputVariables<
	keyof Transaction,
	| keyof Pick<
			Transaction,
			'customer_name' | 'status' | 'transaction_code' | 'created_at' | 'paid_at'
	  >
	| keyof FilterBased
	| 'floor_area_uuid'
>;

export type GetTransactionsResult = ResultQuery<Transactions | undefined> & {
	pagination: Pagination | undefined;
};

export type GetTransactionInput = {transaction_uuid: string};
export type GetTransactionResult = ResultQuery<Transaction | undefined>;

export type GetTransactionSummaryInput = {restaurant_outlet_uuid: string};
export type GetTransactionSummaryResult = ResultQuery<
	TransactionSummary | undefined
>;
