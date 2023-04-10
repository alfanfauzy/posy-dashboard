import Post from '@/data/common/api/post';
import {CreateTransactionInput} from '@/domain/transaction/repositories/CreateTransactionRepository';
import {Response} from '@/domain/vo/BaseResponse';
import {UseMutationOptions, useMutation} from '@tanstack/react-query';
import {AxiosError} from 'axios';

import {CreateTransactionDataResponse} from '../types';

const CreateTransaction = async (
	input: CreateTransactionInput,
): Promise<Response<CreateTransactionDataResponse>> => {
	const response = await Post({
		endpoint: `/order-service/transaction/create`,
		data: input,
	});

	return {
		code: response?.code,
		data: response?.data,
		message: response?.message,
		more_info: response?.more_info,
	};
};

export const useCreateTransactionMutation = (
	options: UseMutationOptions<
		Response<CreateTransactionDataResponse>,
		AxiosError<Response>,
		CreateTransactionInput
	>,
) =>
	useMutation({
		mutationFn: CreateTransaction,
		...options,
	});
