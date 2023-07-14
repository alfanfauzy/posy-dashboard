import Get from '@/data/common/api/get';
import {GetTableLayoutByFloorInput} from '@/domain/table/repositories/GetTableLayoutByFloorRepository';
import {Response} from '@/domain/vo/BaseResponse';
import {useQuery, UseQueryOptions} from '@tanstack/react-query';

import {GetTableLayoutByFloorDataResponse} from '../types/GetTableLayoutByFloorType';

export const GetTableLayoutByFloorQueryKey = 'table-layout/list' as const;

const GetTableLayoutByFloor = async (
	input: GetTableLayoutByFloorInput,
): Promise<Response<GetTableLayoutByFloorDataResponse>> => {
	const response = await Get({
		endpoint: `/user-service/table/get-layout-by-floor/${input.area_uuid}`,
		params: {
			...input,
		},
	});

	return {
		code: response?.code,
		data: response?.data,
		message: response?.message,
		more_info: response?.more_info,
	};
};

export const useGetTableLayoutByFloorQuery = (
	input: GetTableLayoutByFloorInput,
	options?: UseQueryOptions<Response<GetTableLayoutByFloorDataResponse>>,
) =>
	useQuery<Response<GetTableLayoutByFloorDataResponse>>(
		[GetTableLayoutByFloorQueryKey, input],
		() => GetTableLayoutByFloor(input),
		{
			refetchOnWindowFocus: false,
			...options,
		},
	);
