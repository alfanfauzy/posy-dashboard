import Post from '@/data/common/api/post';
import {GetTableStatusInput} from '@/domain/transaction/repositories/GetTableStatusRepository';
import {DataList, Response} from '@/domain/vo/BaseResponse';
import {useQuery, UseQueryOptions} from '@tanstack/react-query';

import {GetTableStatusDataResponse} from '../types/GetTableStatusType';

export const GetTableStatusQueryKey = 'transactions/table-status' as const;

const GetTableStatus = async (
	input: GetTableStatusInput,
): Promise<Response<DataList<GetTableStatusDataResponse>>> => {
	const response = await Post({
		endpoint: `/order-service/transaction/table/status`,
		data: input,
	});

	return {
		code: response?.code,
		data: response?.data,
		message: response?.message,
		more_info: response?.more_info,
	};
};

export const useGetTableStatusQuery = (
	input: GetTableStatusInput,
	options?: UseQueryOptions<Response<DataList<GetTableStatusDataResponse>>>,
) =>
	useQuery<Response<DataList<GetTableStatusDataResponse>>>(
		[GetTableStatusQueryKey, input],
		() => GetTableStatus(input),
		{
			refetchOnWindowFocus: false,
			...options,
		},
	);
