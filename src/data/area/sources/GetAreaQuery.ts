import Get from '@/data/common/api/get';
import {GetAreaInput} from '@/domain/area/repositories/GetAreaRepository';
import {Response} from '@/domain/vo/BaseResponse';
import {useQuery, UseQueryOptions} from '@tanstack/react-query';

import {GetAreaDataResponse} from '../types/GetAreaType';

export const GetAreaQueryKey = 'Area/list' as const;

const GetArea = async (
	input: GetAreaInput,
): Promise<Response<GetAreaDataResponse>> => {
	const response = await Get({
		endpoint: `/user-service/floor/get-list`,
		params: input,
	});

	return {
		code: response?.code,
		data: response?.data,
		message: response?.message,
		more_info: response?.more_info,
	};
};

export const useGetAreaQuery = (
	input: GetAreaInput,
	options?: UseQueryOptions<Response<GetAreaDataResponse>>,
) =>
	useQuery<Response<GetAreaDataResponse>>(
		[GetAreaQueryKey, input],
		() => GetArea(input),
		{
			refetchOnWindowFocus: false,
			...options,
		},
	);
