import Get from '@/data/common/api/get';
import {GetAreasInput} from '@/domain/area/repositories/GetAreasRepository';
import {DataList, Response} from '@/domain/vo/BaseResponse';
import {useQuery, UseQueryOptions} from '@tanstack/react-query';

import {GetAreasDataResponse} from '../types/GetAreasType';

export const GetAreasQueryKey = 'Areas/list' as const;

const GetAreas = async (
	input: GetAreasInput,
): Promise<Response<DataList<GetAreasDataResponse>>> => {
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

export const useGetAreasQuery = (
	input: GetAreasInput,
	options?: UseQueryOptions<Response<DataList<GetAreasDataResponse>>>,
) =>
	useQuery<Response<DataList<GetAreasDataResponse>>>(
		[GetAreasQueryKey, input],
		() => GetAreas(input),
		{
			refetchOnWindowFocus: false,
			...options,
		},
	);
