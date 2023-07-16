import Post from '@/data/common/api/post';
import {GetDetailRatingsInput} from '@/domain/rating/repositories/GetDetailRatingsRepository';
import {DataList, Response} from '@/domain/vo/BaseResponse';
import {useQuery, UseQueryOptions} from '@tanstack/react-query';

import {GetDetailRatingsDataResponse} from '../types/GetDetailRatingsType';

export const GetDetailRatingsQueryKey = 'rating/list' as const;

const GetDetailRatings = async (
	input: GetDetailRatingsInput,
): Promise<Response<DataList<GetDetailRatingsDataResponse>>> => {
	const response = await Post({
		endpoint: `/product-service/rating/get-review-list`,
		data: input,
	});

	return {
		code: response?.code,
		data: response?.data,
		message: response?.message,
		more_info: response?.more_info,
	};
};

export const useGetDetailRatingsQuery = (
	input: GetDetailRatingsInput,
	options?: UseQueryOptions<Response<DataList<GetDetailRatingsDataResponse>>>,
) =>
	useQuery<Response<DataList<GetDetailRatingsDataResponse>>>(
		[GetDetailRatingsQueryKey, input],
		() => GetDetailRatings(input),
		{
			refetchOnWindowFocus: false,
			...options,
		},
	);
