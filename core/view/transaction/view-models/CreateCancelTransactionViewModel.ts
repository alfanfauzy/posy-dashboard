import {MutationOptions} from '@/data/common/types';
import {useCreateCancelTransactionUsecase} from '@/data/transaction/usecases/CreateCancelTransactionUsecase';
import {CreateCancelTransactionRepository} from '@/domain/transaction/repositories/CreateCancelTransactionRepository';

export const useCreateCancelTransactionViewModel = (
	options: MutationOptions,
): CreateCancelTransactionRepository => {
	const result = useCreateCancelTransactionUsecase(options);

	return result;
};
