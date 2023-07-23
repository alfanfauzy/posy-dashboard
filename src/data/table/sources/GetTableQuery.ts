import Post from '@/data/common/api/post';
import {GetTableInput} from '@/domain/table/repositories/GetTableRepository';
import {Response} from '@/domain/vo/BaseResponse';
import {useQuery, UseQueryOptions} from '@tanstack/react-query';

import {GetTableDataResponse} from '../types/GetTableType';

export const GetTableQueryKey = 'table/detail' as const;

const GetTable = async (
	input: GetTableInput,
): Promise<Response<GetTableDataResponse>> => {
	const response = await Post({
		endpoint: `/user-service/table/get-detail/${input.table_uuid}}`,
		data: input,
	});

	return {
		code: response?.code,
		data: response?.data,
		message: response?.message,
		more_info: response?.more_info,
	};
};

export const useGetTableQuery = (
	input: GetTableInput,
	options?: UseQueryOptions<Response<GetTableDataResponse>>,
) =>
	useQuery<Response<GetTableDataResponse>>(
		[GetTableQueryKey, input],
		() => GetTable(input),
		{
			refetchOnWindowFocus: false,
			...options,
		},
	);
