import {GetTransactionReportSummaryInput} from '@/domain/report/repositories/GetTransactionReportSummaryRepository';
import {Response} from '@/domain/vo/BaseResponse';
import {useQuery, UseQueryOptions} from '@tanstack/react-query';
import Post from 'api/post';

import {GetTransactionReportSummaryDataResponse} from '../types/GetTransactionReportSummaryType';

export const GetTransactionReportSummaryQueryKey =
	'transaction-reports/summary' as const;

const GetTransactionReportSummary = async (
	input?: GetTransactionReportSummaryInput,
): Promise<Response<GetTransactionReportSummaryDataResponse>> => {
	const response = await Post({
		endpoint: `/order-service/report/transaction/summary`,
		data: input,
	});

	return {
		code: response?.code,
		data: response?.data,
		message: response?.message,
		more_info: response?.more_info,
	};
};

export const useGetTransactionReportSummaryQuery = (
	input?: GetTransactionReportSummaryInput,
	options?: UseQueryOptions<Response<GetTransactionReportSummaryDataResponse>>,
) =>
	useQuery<Response<GetTransactionReportSummaryDataResponse>>(
		[GetTransactionReportSummaryQueryKey, input],
		() => GetTransactionReportSummary(input),
		{
			refetchOnWindowFocus: false,
			...options,
		},
	);
