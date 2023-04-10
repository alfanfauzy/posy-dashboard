import Post from '@/data/common/api/post';
import {GetTransactionReportsInput} from '@/domain/report/repositories/GetTransactionReportsRepository';
import {DataList, Response} from '@/domain/vo/BaseResponse';
import {useQuery, UseQueryOptions} from '@tanstack/react-query';

import {GetTransactionReportsDataResponse} from '../types/GetTransactionReportsType';

export const GetTransactionReportsQueryKey =
	'transaction-reports/list' as const;

const GetTransactionReports = async (
	input?: GetTransactionReportsInput,
): Promise<Response<DataList<GetTransactionReportsDataResponse>>> => {
	const response = await Post({
		endpoint: `/order-service/report/transaction/list`,
		data: input,
	});

	return {
		code: response?.code,
		data: response?.data,
		message: response?.message,
		more_info: response?.more_info,
	};
};

export const useGetTransactionReportsQuery = (
	input?: GetTransactionReportsInput,
	options?: UseQueryOptions<
		Response<DataList<GetTransactionReportsDataResponse>>
	>,
) =>
	useQuery<Response<DataList<GetTransactionReportsDataResponse>>>(
		[GetTransactionReportsQueryKey, input],
		() => GetTransactionReports(input),
		{
			refetchOnWindowFocus: false,
			...options,
		},
	);
