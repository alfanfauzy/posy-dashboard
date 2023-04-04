import {MutationOptions} from '@/data/common/types';
import {CreateMakePaymentInput} from '@/domain/transaction/repositories/CreateMakePaymentRepository';
import {Response} from '@/domain/vo/BaseResponse';
import {useMutation} from '@tanstack/react-query';
import Post from 'api/post';

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
	options?: MutationOptions<CreateMakePaymentDataResponse>,
) =>
	useMutation({
		mutationFn: (input: CreateMakePaymentInput) => CreateMakePayment(input),
		...options,
	});
