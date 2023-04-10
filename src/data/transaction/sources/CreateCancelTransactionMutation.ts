import Post from '@/data/common/api/post';
import {CreateCancelTransactionInput} from '@/domain/transaction/repositories/CreateCancelTransactionRepository';
import {Response} from '@/domain/vo/BaseResponse';
import {UseMutationOptions, useMutation} from '@tanstack/react-query';
import {AxiosError} from 'axios';

import {CreateCancelTransactionDataResponse} from '../types/CreateCancelTransactionType';

const CreateCancelTransaction = async (
	input: CreateCancelTransactionInput,
): Promise<Response<CreateCancelTransactionDataResponse>> => {
	const response = await Post({
		endpoint: `/order-service/transaction/cancel/${input.transaction_uuid}`,
		data: input,
	});

	return {
		code: response?.code,
		data: response?.data,
		message: response?.message,
		more_info: response?.more_info,
	};
};

export const useCreateCancelTransactionMutation = (
	options: UseMutationOptions<
		Response<CreateCancelTransactionDataResponse>,
		AxiosError<Response>,
		CreateCancelTransactionInput
	>,
) =>
	useMutation({
		mutationFn: (input: CreateCancelTransactionInput) =>
			CreateCancelTransaction(input),
		...options,
	});
