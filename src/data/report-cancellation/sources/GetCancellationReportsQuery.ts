import Post from '@/data/common/api/post';
import {GetCancellationReportsInput} from '@/domain/report-cancellation/repositories/GetCancellationReportRepository';
import {DataList, Response} from '@/domain/vo/BaseResponse';
import {useQuery, UseQueryOptions} from '@tanstack/react-query';

import {GetCancellationReportsDataResponse} from '../types/GetCancellationReportsType';

export const GetTransactionReportsQueryKey =
	'cancellation-reports/list' as const;

const GetCancellationReports = async (
	input?: GetCancellationReportsInput,
): Promise<Response<DataList<GetCancellationReportsDataResponse>>> => {
	const response = await Post({
		endpoint: `/order-service/report/cancel-order/list`,
		data: input,
	});

	return {
		code: response?.code,
		data: response?.data,
		message: response?.message,
		more_info: response?.more_info,
	};
};

export const useGetCancellationReportsQuery = (
	input?: GetCancellationReportsInput,
	options?: UseQueryOptions<
		Response<DataList<GetCancellationReportsDataResponse>>
	>,
) =>
	useQuery<Response<DataList<GetCancellationReportsDataResponse>>>(
		[GetTransactionReportsQueryKey, input],
		() => GetCancellationReports(input),
		{
			refetchOnWindowFocus: false,
			...options,
		},
	);
