import {MutationOptions} from '@/data/common/types';
import {UpdateTransactionInput} from '@/domain/transaction/repositories/TransactionRepository';
import {Response} from '@/domain/vo/BaseResponse';
import {useMutation} from '@tanstack/react-query';
import Post from 'api/post';

import {UpdateTransactionDataResponse} from '../types';

const UpdateTransaction = async (
	input: UpdateTransactionInput,
): Promise<Response<UpdateTransactionDataResponse>> => {
	const response = await Post({
		endpoint: `/order-service/transaction/update/${input.transaction_uuid}`,
		data: input,
	});

	return {
		code: response?.code,
		data: response?.data,
		message: response?.message,
		more_info: response?.more_info,
	};
};

export const useUpdateTransactionMutation = (
	options?: MutationOptions<UpdateTransactionDataResponse>,
) =>
	useMutation({
		mutationFn: (input: UpdateTransactionInput) => UpdateTransaction(input),
		...options,
	});
