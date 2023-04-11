import Post from '@/data/common/api/post';
import {CreateRefundTransactionInput} from '@/domain/transaction/repositories/CreateRefundTransactionRepository';
import {Response} from '@/domain/vo/BaseResponse';
import {UseMutationOptions, useMutation} from '@tanstack/react-query';
import {AxiosError} from 'axios';

import {CreateRefundTransactionDataResponse} from '../types/CreateRefundTransactionType';

const CreateRefundTransaction = async (
	input: CreateRefundTransactionInput,
): Promise<Response<CreateRefundTransactionDataResponse>> => {
	const response = await Post({
		endpoint: `/order-service/transaction/refund/${input.transaction_uuid}`,
		data: input,
	});

	return {
		code: response?.code,
		data: response?.data,
		message: response?.message,
		more_info: response?.more_info,
	};
};

export const useCreateRefundTransactionMutation = (
	options: UseMutationOptions<
		Response<CreateRefundTransactionDataResponse>,
		AxiosError<Response>,
		CreateRefundTransactionInput
	>,
) =>
	useMutation({
		mutationFn: CreateRefundTransaction,
		...options,
	});
