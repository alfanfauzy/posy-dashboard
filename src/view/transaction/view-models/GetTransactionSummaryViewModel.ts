import {GetTransactionSummaryDataResponse} from '@/data/transaction/types';
import {useGetTransactionSummaryUsecase} from '@/data/transaction/usecases/GetTransactionSummaryUsecase';
import {
	GetTransactionSummaryInput,
	GetTransactionSummaryResult,
} from '@/domain/transaction/repositories/TransactionRepository';
import {Response} from '@/domain/vo/BaseResponse';
import {UseQueryOptions} from '@tanstack/react-query';

export const useGetTransactionSummaryViewModel = (
	input?: GetTransactionSummaryInput,
	options?: UseQueryOptions<Response<GetTransactionSummaryDataResponse>>,
): GetTransactionSummaryResult => {
	const result = useGetTransactionSummaryUsecase(input, options);

	return result;
};
