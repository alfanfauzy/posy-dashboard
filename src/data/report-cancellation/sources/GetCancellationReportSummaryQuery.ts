import Post from '@/data/common/api/post';
import {GetCancellationReportSummaryInput} from '@/domain/report-cancellation/repositories/GetCancellationSummaryRepository';
import {Response} from '@/domain/vo/BaseResponse';
import {useQuery, UseQueryOptions} from '@tanstack/react-query';

import {GetCancellationReportSummaryDataResponse} from '../types/GetCancellationReportSummaryType';

export const GetTransactionReportSummaryQueryKey =
	'transaction-reports/summary' as const;

const GetTransactionReportSummary = async (
	input?: GetCancellationReportSummaryInput,
): Promise<Response<GetCancellationReportSummaryDataResponse>> => {
	const response = await Post({
		endpoint: `/order-service/report/cancel-order/summary`,
		data: input,
	});

	return {
		code: response?.code,
		data: response?.data,
		message: response?.message,
		more_info: response?.more_info,
	};
};

export const useGetCancellationReportSummaryQuery = (
	input?: GetCancellationReportSummaryInput,
	options?: UseQueryOptions<Response<GetCancellationReportSummaryDataResponse>>,
) =>
	useQuery<Response<GetCancellationReportSummaryDataResponse>>(
		[GetTransactionReportSummaryQueryKey, input],
		() => GetTransactionReportSummary(input),
		{
			refetchOnWindowFocus: false,
			...options,
		},
	);
