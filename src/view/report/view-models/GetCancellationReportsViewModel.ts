import {GetCancellationReportsDataResponse} from '@/data/report-cancellation/types/GetCancellationReportsType';
import {useGetCancellationReportsUsecase} from '@/data/report-cancellation/usecases/GetCancellationReportsUsecase';
import {
	GetCancellationReportsInput,
	GetCancellationReportsResult,
} from '@/domain/report-cancellation/repositories/GetCancellationReportRepository';
import {DataList, Response} from '@/domain/vo/BaseResponse';
import {UseQueryOptions} from '@tanstack/react-query';

export const useGetCancellationReportsViewModel = (
	input?: GetCancellationReportsInput,
	options?: UseQueryOptions<
		Response<DataList<GetCancellationReportsDataResponse>>
	>,
): GetCancellationReportsResult => {
	const result = useGetCancellationReportsUsecase(input, options);

	return result;
};
