import {MutationOptions} from '@/data/common/types';
import {useCreatePaymentWithdrawUsecases} from '@/data/payment/usecases/CreatePaymentWithdrawUsecases';
import {CreatePaymentWithdrawRepository} from '@/domain/payment/repositories/PaymentRepositories';

export const useUpdatePaymentWithdrawViewModal = (
	options: MutationOptions,
): CreatePaymentWithdrawRepository => {
	const result = useCreatePaymentWithdrawUsecases(options);

	return result;
};
