import Get from '@/data/common/api/get';
import {GetAreaSizesInput} from '@/domain/area/repositories/GetAreaSizesRepository';
import {DataList, Response} from '@/domain/vo/BaseResponse';
import {useQuery, UseQueryOptions} from '@tanstack/react-query';

import {GetAreaSizesDataResponse} from '../types/GetAreaSizesType';

export const GetAreaSizesQueryKey = 'AreaSizes/list' as const;

const GetAreaSizes = async (
	input: GetAreaSizesInput,
): Promise<Response<DataList<GetAreaSizesDataResponse>>> => {
	const response = await Get({
		endpoint: `/user-service/floor/size/${input.type}`,
	});

	return {
		code: response?.code,
		data: response?.data,
		message: response?.message,
		more_info: response?.more_info,
	};
};

export const useGetAreaSizesQuery = (
	input: GetAreaSizesInput,
	options?: UseQueryOptions<Response<DataList<GetAreaSizesDataResponse>>>,
) =>
	useQuery<Response<DataList<GetAreaSizesDataResponse>>>(
		[GetAreaSizesQueryKey, input],
		() => GetAreaSizes(input),
		{
			refetchOnWindowFocus: false,
			...options,
		},
	);
