import {MutationOptions} from '@/data/common/types';
import {CreateMakePaymentDataResponse} from '@/data/transaction/types/CreateMakePaymentType';
import {useCreateMakePaymentUsecase} from '@/data/transaction/usecases/CreateMakePaymentUsecase';
import {CreateMakePaymentRepository} from '@/domain/transaction/repositories/CreateMakePaymentRepository';

export const useCreateMakePaymentViewModel = (
	options?: MutationOptions<CreateMakePaymentDataResponse>,
): CreateMakePaymentRepository => {
	const result = useCreateMakePaymentUsecase(options);

	return result;
};
