import Post from '@/data/common/api/post';
import {GetPaymentWithdrawResponse} from '@/data/payment/types/index';
import {PaymentWithdrawPayload} from '@/domain/payment/models';
import {Response} from '@/domain/vo/BaseResponse';
import {useMutation, UseMutationOptions} from '@tanstack/react-query';
import {AxiosError} from 'axios';

export const CreatePaymentWithdrawQuery = async (
	input: PaymentWithdrawPayload,
): Promise<Response<GetPaymentWithdrawResponse>> => {
	try {
		const response = await Post({
			endpoint: `/payment-service/payment/withdrawal`,
			data: input,
		});

		return response;
	} catch (error) {
		const err = error as AxiosError;
		throw err.response?.data;
	}
};

export const useCreatePaymentWithdrawMutation = (
	options?: UseMutationOptions<
		Response<GetPaymentWithdrawResponse>,
		AxiosError<Response>,
		PaymentWithdrawPayload
	>,
) =>
	useMutation({
		mutationFn: CreatePaymentWithdrawQuery,
		...options,
	});
