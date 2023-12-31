import Post from '@/data/common/api/post';
import {GetTransactionSummaryInput} from '@/domain/transaction/repositories/TransactionRepository';
import {Response} from '@/domain/vo/BaseResponse';
import {useQuery, UseQueryOptions} from '@tanstack/react-query';

import {GetTransactionSummaryDataResponse} from '../types';

export const GetTransactionSummaryQueryKey = 'transactions/summary' as const;

const GetTransactionSummary = async (
	input?: GetTransactionSummaryInput,
): Promise<Response<GetTransactionSummaryDataResponse>> => {
	const response = await Post({
		endpoint: `/order-service/transaction/count/status`,
		data: input,
	});

	return {
		code: response?.code,
		data: response?.data,
		message: response?.message,
		more_info: response?.more_info,
	};
};

export const useGetTransactionSummaryQuery = (
	input?: GetTransactionSummaryInput,
	options?: UseQueryOptions<Response<GetTransactionSummaryDataResponse>>,
) =>
	useQuery<Response<GetTransactionSummaryDataResponse>>(
		[GetTransactionSummaryQueryKey, input],
		() => GetTransactionSummary(input),
		{
			refetchOnWindowFocus: false,
			...options,
		},
	);
