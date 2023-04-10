import {MutationOptions} from '@/data/common/types';
import {useCreateMakePaymentUsecase} from '@/data/transaction/usecases/CreateMakePaymentUsecase';
import {CreateMakePaymentRepository} from '@/domain/transaction/repositories/CreateMakePaymentRepository';

export const useCreateMakePaymentViewModel = (
	options: MutationOptions,
): CreateMakePaymentRepository => {
	const result = useCreateMakePaymentUsecase(options);

	return result;
};
