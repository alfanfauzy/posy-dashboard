import {MutationOptions} from '@/data/common/types';
import {useCreatePaymentWithdrawUsecases} from '@/data/payment/usecases/CreatePaymentWithdrawUsecase';
import {CreatePaymentWithdrawRepository} from '@/domain/payment/repositories/CreatePaymentWithdrawRepository';

export const useUpdatePaymentWithdrawViewModal = (
	options: MutationOptions,
): CreatePaymentWithdrawRepository => {
	const result = useCreatePaymentWithdrawUsecases(options);

	return result;
};
