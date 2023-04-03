import {MutationOptions} from '@/data/common/types';
import {CreateCancelTransactionDataResponse} from '@/data/transaction/types/CreateCancelTransactionType';
import {useCreateCancelTransactionUsecase} from '@/data/transaction/usecases/CreateCancelTransactionUsecase';
import {CreateCancelTransactionRepository} from '@/domain/transaction/repositories/CreateCancelTransactionRepository';

export const useCreateCancelTransactionViewModel = (
	options?: MutationOptions<CreateCancelTransactionDataResponse>,
): CreateCancelTransactionRepository => {
	const result = useCreateCancelTransactionUsecase(options);

	return result;
};
