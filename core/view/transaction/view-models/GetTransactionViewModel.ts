import {GetTransactionDataResponse} from '@/data/transaction/types';
import {useGetTransactionUsecase} from '@/data/transaction/usecases/GetTransactionUsecase';
import {
	GetTransactionInput,
	GetTransactionResult,
} from '@/domain/transaction/repositories/TransactionRepository';
import {Response} from '@/domain/vo/BaseResponse';
import {UseQueryOptions} from '@tanstack/react-query';

export const useGetTransactionViewModel = (
	input: GetTransactionInput,
	options?: UseQueryOptions<Response<GetTransactionDataResponse>>,
): GetTransactionResult => {
	const result = useGetTransactionUsecase(input, options);

	return result;
};
