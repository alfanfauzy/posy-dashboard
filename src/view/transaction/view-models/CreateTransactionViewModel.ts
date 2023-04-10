import {MutationOptions} from '@/data/common/types';
import {useCreateTransactionUsecase} from '@/data/transaction/usecases/CreateTransactionUsecase';
import {CreateTransactionRepository} from '@/domain/transaction/repositories/CreateTransactionRepository';

export const useCreateTransactionViewModel = (
	options: MutationOptions,
): CreateTransactionRepository => {
	const result = useCreateTransactionUsecase(options);

	return result;
};
