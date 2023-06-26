import {mapToBankListMapper} from '@/data/bank/mappers/BankMapper';
import {useGetBankListQuery} from '@/data/bank/sources/GetBankListQuery';
import {GetBankListResponse} from '@/data/bank/types';
import {GetBankListsResult} from '@/domain/bank/repositories/BankRepository';
import {Response} from '@/domain/vo/BaseResponse';
import {UseQueryOptions} from '@tanstack/react-query';

export const useGetBankListUsecases = (
	options?: UseQueryOptions<Response<Array<GetBankListResponse>>>,
): GetBankListsResult => {
	const {data, ...rest} = useGetBankListQuery(options);

	if (data?.data) {
		const bankListMapper = mapToBankListMapper(data.data);

		return {
			data: bankListMapper,
			...rest,
		};
	}

	return {
		data: undefined,
		...rest,
	};
};
