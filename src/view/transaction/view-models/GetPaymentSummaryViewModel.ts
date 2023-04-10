import {GetPaymentSummaryDataResponse} from '@/data/transaction/types/GetPaymentSummaryType';
import {useGetPaymentSummaryUsecase} from '@/data/transaction/usecases/GetPaymentSummaryUsecase';
import {
	GetPaymentSummaryInput,
	GetPaymentSummaryResult,
} from '@/domain/transaction/repositories/GetPaymentSummaryRepository';
import {Response} from '@/domain/vo/BaseResponse';
import {UseQueryOptions} from '@tanstack/react-query';

export const useGetPaymentSummaryViewModel = (
	input: GetPaymentSummaryInput,
	options?: UseQueryOptions<Response<GetPaymentSummaryDataResponse>>,
): GetPaymentSummaryResult => {
	const result = useGetPaymentSummaryUsecase(input, options);

	return result;
};
