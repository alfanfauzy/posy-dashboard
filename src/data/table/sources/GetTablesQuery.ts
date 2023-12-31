import Post from '@/data/common/api/post';
import {GetTablesInput} from '@/domain/table/repositories/TableRepository';
import {DataList, Response} from '@/domain/vo/BaseResponse';
import {useQuery, UseQueryOptions} from '@tanstack/react-query';

import {GetTablesDataResponse} from '../types';

export const GetTablesQueryKey = 'table/list' as const;

const GetTables = async (
	input?: GetTablesInput,
): Promise<Response<DataList<GetTablesDataResponse>>> => {
	const response = await Post({
		endpoint: `/user-service/table/get-list`,
		data: input,
	});

	return {
		code: response?.code,
		data: response?.data,
		message: response?.message,
		more_info: response?.more_info,
	};
};

export const useGetTablesQuery = (
	input?: GetTablesInput,
	options?: UseQueryOptions<Response<DataList<GetTablesDataResponse>>>,
) =>
	useQuery<Response<DataList<GetTablesDataResponse>>>(
		[GetTablesQueryKey, input],
		() => GetTables(input),
		{
			refetchOnWindowFocus: false,
			...options,
		},
	);
