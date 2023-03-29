import {MutationOptions} from '@/data/common/types';
import {UpdateTransactionDataResponse} from '@/data/transaction/types';
import {useUpdateTransactionUsecase} from '@/data/transaction/usecases/UpdateTransactionUsecase';
import {UpdateTransactionRepository} from '@/domain/transaction/repositories/TransactionRepository';

export const useUpdateTransactionViewModel = (
	options?: MutationOptions<UpdateTransactionDataResponse>,
): UpdateTransactionRepository => {
	const result = useUpdateTransactionUsecase(options);

	return result;
};
