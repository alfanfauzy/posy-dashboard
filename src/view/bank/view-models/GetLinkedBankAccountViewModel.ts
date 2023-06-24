import {GetLinkedBankAccountResponse} from '@/data/bank/types';
import {useGetLinkedBankUsecase} from '@/data/bank/usecases/GetLinkedBankUsecase';
import {GetLinkedBankResult} from '@/domain/bank/repositories/BankRepository';
import {Response} from '@/domain/vo/BaseResponse';
import {UseQueryOptions} from '@tanstack/react-query';

export const useGetLinkedBankAccountViewModel = (
	options?: UseQueryOptions<Response<GetLinkedBankAccountResponse>>,
): GetLinkedBankResult => {
	const result = useGetLinkedBankUsecase(options);

	return result;
};
