import {GetLinkedBankAccountResponse} from '@/data/bank/types';
import {useGetLinkedBankUsecases} from '@/data/bank/usecases/GetLinkedBankUsecases';
import {GetLinkedBankResult} from '@/domain/bank/repositories/BankRepository';
import {Response} from '@/domain/vo/BaseResponse';
import {UseQueryOptions} from '@tanstack/react-query';

export const useGetLinkedBankAccountViewModel = (
	options?: UseQueryOptions<Response<GetLinkedBankAccountResponse>>,
): GetLinkedBankResult => {
	const result = useGetLinkedBankUsecases(options);

	return result;
};
