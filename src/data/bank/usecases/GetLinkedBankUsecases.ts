import {mapToLinkedBankAccount} from '@/data/bank/mappers/BankMapper';
import {useGetLinkedBankAccountQuery} from '@/data/bank/sources/GetLinkedBankQuery';
import {GetLinkedBankAccountResponse} from '@/data/bank/types';
import {GetLinkedBankResult} from '@/domain/bank/repositories/BankRepository';
import {Response} from '@/domain/vo/BaseResponse';
import {UseQueryOptions} from '@tanstack/react-query';

export const useGetLinkedBankUsecases = (
	options?: UseQueryOptions<Response<GetLinkedBankAccountResponse>>,
): GetLinkedBankResult => {
	const {data, ...rest} = useGetLinkedBankAccountQuery(options);
	if (data?.data) {
		const linkedBankAccountMapper = mapToLinkedBankAccount(data.data);

		return {
			data: linkedBankAccountMapper,
			...rest,
		};
	}

	return {
		data: undefined,
		...rest,
	};
};
