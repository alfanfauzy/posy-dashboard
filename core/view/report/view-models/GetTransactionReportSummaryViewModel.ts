import {GetTransactionReportSummaryDataResponse} from '@/data/report/types/GetTransactionReportSummaryType';
import {useGetTransactionReportSummaryUsecase} from '@/data/report/usecases/GetTransactionReportSummaryUsecase';
import {
	GetTransactionReportSummaryInput,
	GetTransactionReportSummaryResult,
} from '@/domain/report/repositories/GetTransactionReportSummaryRepository';
import {Response} from '@/domain/vo/BaseResponse';
import {UseQueryOptions} from '@tanstack/react-query';

export const useGetTransactionReportSummaryViewModel = (
	input?: GetTransactionReportSummaryInput,
	options?: UseQueryOptions<Response<GetTransactionReportSummaryDataResponse>>,
): GetTransactionReportSummaryResult => {
	const result = useGetTransactionReportSummaryUsecase(input, options);

	return result;
};
