import Get from '@/data/common/api/get';
import {GetOutletDetailPayload} from '@/domain/outlet/repositories/GetOutletDetailRepository';
import {DataList, Response} from '@/domain/vo/BaseResponse';
import {useQuery, UseQueryOptions} from '@tanstack/react-query';

import {GetOutletDetailResponse} from '../types/GetOutletDetailType';

export const GetOutletDetailQueryKey = 'outlet/detail';

const GetOutletDetail = async (
	input: GetOutletDetailPayload,
): Promise<Response<GetOutletDetailResponse>> => {
	const response = await Get({
		endpoint: `/user-service/outlet/get-detail/${input.restaurant_outlet_uuid}`,
	});

	return {
		code: response?.code,
		data: response?.data,
		message: response?.message,
		more_info: response?.more_info,
	};
};

export const useGetOutletDetailQuery = (
	input: GetOutletDetailPayload,
	options?: UseQueryOptions<Response<GetOutletDetailResponse>>,
) =>
	useQuery<Response<GetOutletDetailResponse>>(
		[GetOutletDetailQueryKey, JSON.stringify(input)],
		() => GetOutletDetail(input),
		{
			refetchOnWindowFocus: false,
			...options,
		},
	);
