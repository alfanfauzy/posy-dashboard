import {GetPaymentWithdrawResponse} from '@/data/payment/types';
import {useCreatePaymentWithdrawUsecase} from '@/data/payment/usecases/CreatePaymentWithdrawUsecase';
import {PaymentWithdrawPayload} from '@/domain/payment/models';
import {CreatePaymentWithdrawRepository} from '@/domain/payment/repositories/PaymentRepositories';
import {Response} from '@/domain/vo/BaseResponse';
import {UseMutationOptions} from '@tanstack/react-query';
import {AxiosError} from 'axios';

export const useUpdatePaymentWithdrawViewModal = (
	options?: UseMutationOptions<
		Response<GetPaymentWithdrawResponse>,
		AxiosError<Response>,
		PaymentWithdrawPayload
	>,
): CreatePaymentWithdrawRepository => {
	const result = useCreatePaymentWithdrawUsecase(options);

	return result;
};
