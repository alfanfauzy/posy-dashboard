import {GetPaymentWithdrawResponse} from '@/data/payment/types';
import {PaymentWithdrawPayload} from '@/domain/payment/models';
import {Response} from '@/domain/vo/BaseResponse';
import {UseMutationOptions} from '@tanstack/react-query';
import {AxiosError} from 'axios';

import {useCreatePaymentWithdrawMutation} from '../sources/CreatePaymentWithdrawMutation';

export const useCreatePaymentWithdrawUsecase = (
	options?: UseMutationOptions<
		Response<GetPaymentWithdrawResponse>,
		AxiosError<Response>,
		PaymentWithdrawPayload
	>,
): any => {
	const {mutate, data, ...rest} = useCreatePaymentWithdrawMutation(options);

	const createPaymentWithdraw = (payload: PaymentWithdrawPayload) => {
		mutate(payload);
	};

	return {
		createPaymentWithdraw,
		data: data?.data,
		...rest,
	};
};
