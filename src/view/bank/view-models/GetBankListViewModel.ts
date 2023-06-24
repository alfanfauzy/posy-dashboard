import {GetBankListResponse} from '@/data/bank/types';
import {useGetBankListUsecase} from '@/data/bank/usecases/GetBankListUsecase';
import {GetBankListsResult} from '@/domain/bank/repositories/BankRepository';
import {Response} from '@/domain/vo/BaseResponse';
import {UseQueryOptions} from '@tanstack/react-query';

export const useGetBankListViewModal = (
	options?: UseQueryOptions<Response<Array<GetBankListResponse>>>,
): GetBankListsResult => {
	const result = useGetBankListUsecase(options);

	return result;
};
