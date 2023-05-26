import Get from '@/data/common/api/get';
import {GetTransactionInput} from '@/domain/transaction/repositories/TransactionRepository';
import {Response} from '@/domain/vo/BaseResponse';
import {useQuery, UseQueryOptions} from '@tanstack/react-query';

import {GetTransactionDataResponse} from '../types';

export const GetTransactionQueryKey = ['transactions/detail'] as const;

const GetTransaction = async (
	input: GetTransactionInput,
): Promise<Response<GetTransactionDataResponse>> => {
	const response = await Get({
		endpoint: `/order-service/transaction/get-detail/${input.transaction_uuid}`,
	});

	return {
		code: response?.code,
		data: response?.data,
		message: response?.message,
		more_info: response?.more_info,
	};
};

export const useGetTransactionQuery = (
	input: GetTransactionInput,
	options?: UseQueryOptions<Response<GetTransactionDataResponse>>,
) =>
	useQuery<Response<GetTransactionDataResponse>>(
		[GetTransactionQueryKey, input],
		() => GetTransaction(input),
		{
			refetchOnWindowFocus: false,
			...options,
		},
	);
