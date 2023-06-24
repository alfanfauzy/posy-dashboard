import Post from '@/data/common/api/post';
import {GetPaymentWithdrawResponse} from '@/data/payment/types/index';
import {PaymentWithdrawPayload} from '@/domain/payment/models';
import {Response} from '@/domain/vo/BaseResponse';
import {useMutation, UseMutationOptions} from '@tanstack/react-query';
import {AxiosError} from 'axios';

export const CreatePaymentWithdraw = async (
	input: PaymentWithdrawPayload,
): Promise<Response<GetPaymentWithdrawResponse>> => {
	const response = await Post({
		endpoint: `/payment-service/payment/withdrawal`,
		data: input,
	});

	return {
		code: response?.code,
		data: response?.data,
		message: response?.message,
		more_info: response?.more_info,
	};
};

export const useCreatePaymentWithdrawMutation = (
	options?: UseMutationOptions<
		Response<GetPaymentWithdrawResponse>,
		AxiosError<Response>,
		PaymentWithdrawPayload
	>,
) =>
	useMutation({
		mutationFn: CreatePaymentWithdraw,
		...options,
	});
