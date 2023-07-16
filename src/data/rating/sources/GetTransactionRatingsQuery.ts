import Post from '@/data/common/api/post';
import {GetTransactionRatingsInput} from '@/domain/rating/repositories/GetTransactionRatingsRepository';
import {DataList, Response} from '@/domain/vo/BaseResponse';
import {useQuery, UseQueryOptions} from '@tanstack/react-query';

import {GetTransactionRatingsDataResponse} from '../types/GetTransactionRatingsType';

export const GetTransactionRatingsQueryKey = 'rating/list' as const;

const GetTransactionRatings = async (
	input: GetTransactionRatingsInput,
): Promise<Response<DataList<GetTransactionRatingsDataResponse>>> => {
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

export const useGetTransactionRatingsQuery = (
	input: GetTransactionRatingsInput,
	options?: UseQueryOptions<
		Response<DataList<GetTransactionRatingsDataResponse>>
	>,
) =>
	useQuery<Response<DataList<GetTransactionRatingsDataResponse>>>(
		[GetTransactionRatingsQueryKey, input],
		() => GetTransactionRatings(input),
		{
			refetchOnWindowFocus: false,
			...options,
		},
	);
