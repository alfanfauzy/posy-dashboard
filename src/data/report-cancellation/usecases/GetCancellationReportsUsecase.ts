import {GetCancellationReportsResult} from '@/domain/report-cancellation/repositories/GetCancellationReportRepository';
import {GetCancellationReportSummaryInput} from '@/domain/report-cancellation/repositories/GetCancellationSummaryRepository copy';
import {DataList, Response} from '@/domain/vo/BaseResponse';
import {UseQueryOptions} from '@tanstack/react-query';

import {mapToCancellationReportModel} from '../mappers/CancellationMapper';
import {useGetCancellationReportsQuery} from '../sources/GetCancellationReportsQuery';
import {GetCancellationReportsDataResponse} from '../types/GetCancellationReportsType';

export const useGetCancellationReportsUsecase = (
	input?: GetCancellationReportSummaryInput,
	options?: UseQueryOptions<
		Response<DataList<GetCancellationReportsDataResponse>>
	>,
): GetCancellationReportsResult => {
	const {data, ...rest} = useGetCancellationReportsQuery(input, options);

	if (data?.data?.objs) {
		const dataMapper = mapToCancellationReportModel(data.data.objs);

		return {
			data: dataMapper,
			pagination: {
				curr_page: data.data.curr_page,
				per_page: data.data.per_page,
				total_objs: data.data.total_objs,
				total_page: data.data.total_page,
			},
			...rest,
		};
	}

	return {
		data: undefined,
		pagination: undefined,
		...rest,
	};
};
