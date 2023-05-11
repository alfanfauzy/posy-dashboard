import {GetCancellationReportSummaryDataResponse} from '@/data/report-cancellation/types/GetCancellationReportSummaryType';
import {useGetCancellationReportSummaryUsecase} from '@/data/report-cancellation/usecases/GetCancellationReportSummaryUsecase';
import {
	GetCancellationReportSummaryInput,
	GetCancellationReportSummaryResult,
} from '@/domain/report-cancellation/repositories/GetCancellationSummaryRepository copy';
import {Response} from '@/domain/vo/BaseResponse';
import {UseQueryOptions} from '@tanstack/react-query';

export const useGetCancellationReportSummaryViewModel = (
	input?: GetCancellationReportSummaryInput,
	options?: UseQueryOptions<Response<GetCancellationReportSummaryDataResponse>>,
): GetCancellationReportSummaryResult => {
	const result = useGetCancellationReportSummaryUsecase(input, options);

	return result;
};
