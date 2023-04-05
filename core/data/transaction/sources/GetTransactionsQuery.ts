import {GetTransactionsInput} from '@/domain/transaction/repositories/TransactionRepository';
import {DataList, Response} from '@/domain/vo/BaseResponse';
import {useQuery, UseQueryOptions} from '@tanstack/react-query';
import Post from 'api/post';

import {GetTransactionsDataResponse} from '../types';

export const GetTransactionsQueryKey = 'transactions/list' as const;

const GetTransactions = async (
	input?: GetTransactionsInput,
): Promise<Response<DataList<GetTransactionsDataResponse>>> => {
	const response = await Post({
		endpoint: `/order-service/transaction/get-list`,
		data: input,
	});

	return {
		code: response?.code,
		data: response?.data,
		message: response?.message,
		more_info: response?.more_info,
	};
};

export const useGetTransactionsQuery = (
	input?: GetTransactionsInput,
	options?: UseQueryOptions<Response<DataList<GetTransactionsDataResponse>>>,
) =>
	useQuery<Response<DataList<GetTransactionsDataResponse>>>(
		[GetTransactionsQueryKey, input],
		() => GetTransactions(input),
		{
			refetchOnWindowFocus: false,
			...options,
		},
	);
