import {GetBankListResponse} from '@/data/bank/types';
import Get from '@/data/common/api/get';
import {Response} from '@/domain/vo/BaseResponse';
import {useQuery, UseQueryOptions} from '@tanstack/react-query';
import {AxiosError} from 'axios';

export const GetBankListQueryKey = 'bank/list';

export const GetBankList = async (): Promise<
	Response<Array<GetBankListResponse>>
> => {
	try {
		const response = await Get({
			endpoint: `/payment-service/bank/get-list`,
		});

		return response;
	} catch (error) {
		const err = error as AxiosError;
		throw err.response?.data;
	}
};

export const useGetBankListQuery = (
	options?: UseQueryOptions<Response<Array<GetBankListResponse>>>,
) =>
	useQuery<Response<Array<GetBankListResponse>>>(
		[GetBankListQueryKey],
		() => GetBankList(),
		{
			...options,
		},
	);
