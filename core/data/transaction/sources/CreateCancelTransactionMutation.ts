import {MutationOptions} from '@/data/common/types';
import {CreateCancelTransactionInput} from '@/domain/transaction/repositories/CreateCancelTransactionRepository';
import {Response} from '@/domain/vo/BaseResponse';
import {useMutation} from '@tanstack/react-query';
import Post from 'api/post';

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
	options?: MutationOptions<CreateCancelTransactionDataResponse>,
) =>
	useMutation({
		mutationFn: (input: CreateCancelTransactionInput) =>
			CreateCancelTransaction(input),
		...options,
	});
