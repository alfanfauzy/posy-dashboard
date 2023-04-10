import {
	GetTransactionReportSummaryInput,
	GetTransactionReportSummaryResult,
} from '@/domain/report/repositories/GetTransactionReportSummaryRepository';
import {Response} from '@/domain/vo/BaseResponse';
import {UseQueryOptions} from '@tanstack/react-query';

import {mapToTransactionReportSummaryModel} from '../mappers/ReportMapper';
import {useGetTransactionReportSummaryQuery} from '../sources/GetTransactionReportSummaryQuery';
import {GetTransactionReportSummaryDataResponse} from '../types/GetTransactionReportSummaryType';

export const useGetTransactionReportSummaryUsecase = (
	input?: GetTransactionReportSummaryInput,
	options?: UseQueryOptions<Response<GetTransactionReportSummaryDataResponse>>,
): GetTransactionReportSummaryResult => {
	const {data, ...rest} = useGetTransactionReportSummaryQuery(input, options);

	if (data?.data) {
		const dataMapper = mapToTransactionReportSummaryModel(data.data);

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
