import {MutationOptions} from '@/data/common/types';
import {useCreatePaymentWithdrawUsecase} from '@/data/payment/usecases/CreatePaymentWithdrawUsecase';
import {CreatePaymentWithdrawRepository} from '@/domain/payment/repositories/PaymentRepositories';

export const useUpdatePaymentWithdrawViewModal = (
	options: MutationOptions,
): CreatePaymentWithdrawRepository => {
	const result = useCreatePaymentWithdrawUsecase(options);

	return result;
};
