import {GetBankListResponse} from '@/data/bank/types';
import {useGetBankListUsecases} from '@/data/bank/usecases/GetBankListUsecases';
import {GetBankListsResult} from '@/domain/bank/repositories/BankRepository';
import {Response} from '@/domain/vo/BaseResponse';
import {UseQueryOptions} from '@tanstack/react-query';

export const useGetBankListViewModal = (
	options?: UseQueryOptions<Response<Array<GetBankListResponse>>>,
): GetBankListsResult => {
	const result = useGetBankListUsecases(options);

	return result;
};
