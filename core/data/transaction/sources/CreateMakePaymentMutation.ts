import {CreateMakePaymentInput} from '@/domain/transaction/repositories/CreateMakePaymentRepository';
import {Response} from '@/domain/vo/BaseResponse';
import {UseMutationOptions, useMutation} from '@tanstack/react-query';
import Post from 'api/post';
import {AxiosError} from 'axios';

import {CreateMakePaymentDataResponse} from '../types/CreateMakePaymentType';

const CreateMakePayment = async (
	input: CreateMakePaymentInput,
): Promise<Response<CreateMakePaymentDataResponse>> => {
	const response = await Post({
		endpoint: `/order-service/transaction/payment/make/${input.transaction_uuid}`,
		data: input,
	});

	return {
		code: response?.code,
		data: response?.data,
		message: response?.message,
		more_info: response?.more_info,
	};
};

export const useCreateMakePaymentMutation = (
	options: UseMutationOptions<
		Response<CreateMakePaymentDataResponse>,
		AxiosError<Response>,
		CreateMakePaymentInput
	>,
) =>
	useMutation({
		mutationFn: CreateMakePayment,
		...options,
	});
