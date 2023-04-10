import {GetTransactionReportsDataResponse} from '@/data/report/types/GetTransactionReportsType';
import {useGetTransactionReportsUsecase} from '@/data/report/usecases/GetTransactionReportsUsecase';
import {
	GetTransactionReportsInput,
	GetTransactionReportsResult,
} from '@/domain/report/repositories/GetTransactionReportsRepository';
import {DataList, Response} from '@/domain/vo/BaseResponse';
import {UseQueryOptions} from '@tanstack/react-query';

export const useGetTransactionReportsViewModel = (
	input?: GetTransactionReportsInput,
	options?: UseQueryOptions<
		Response<DataList<GetTransactionReportsDataResponse>>
	>,
): GetTransactionReportsResult => {
	const result = useGetTransactionReportsUsecase(input, options);

	return result;
};
