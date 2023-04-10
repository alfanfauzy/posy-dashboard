import {MutationOptions} from '@/data/common/types';
import {useUpdateTransactionUsecase} from '@/data/transaction/usecases/UpdateTransactionUsecase';
import {UpdateTransactionRepository} from '@/domain/transaction/repositories/UpdateTransactionRepository';

export const useUpdateTransactionViewModel = (
	options: MutationOptions,
): UpdateTransactionRepository => {
	const result = useUpdateTransactionUsecase(options);

	return result;
};
