import {MutationOptions} from '@/data/common/types';
import {useCreateRefundTransactionUsecase} from '@/data/transaction/usecases/CreateRefundTransactionUsecase';
import {CreateRefundTransactionRepository} from '@/domain/transaction/repositories/CreateRefundTransactionRepository';

export const useCreateRefundTransactionViewModel = (
	options: MutationOptions,
): CreateRefundTransactionRepository => {
	const result = useCreateRefundTransactionUsecase(options);

	return result;
};
