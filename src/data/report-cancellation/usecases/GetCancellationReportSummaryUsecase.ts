import {
	GetCancellationReportSummaryInput,
	GetCancellationReportSummaryResult,
} from '@/domain/report-cancellation/repositories/GetCancellationSummaryRepository';
import {Response} from '@/domain/vo/BaseResponse';
import {UseQueryOptions} from '@tanstack/react-query';

import {mapToCancellationReportSummaryModel} from '../mappers/CancellationMapper';
import {useGetCancellationReportSummaryQuery} from '../sources/GetCancellationReportSummaryQuery';
import {GetCancellationReportSummaryDataResponse} from '../types/GetCancellationReportSummaryType';

export const useGetCancellationReportSummaryUsecase = (
	input?: GetCancellationReportSummaryInput,
	options?: UseQueryOptions<Response<GetCancellationReportSummaryDataResponse>>,
): GetCancellationReportSummaryResult => {
	const {data, ...rest} = useGetCancellationReportSummaryQuery(input, options);

	if (data?.data) {
		const dataMapper = mapToCancellationReportSummaryModel(data.data);

		return {
			data: dataMapper,
			...rest,
		};
	}

	return {
		data: undefined,
		...rest,
	};
};
