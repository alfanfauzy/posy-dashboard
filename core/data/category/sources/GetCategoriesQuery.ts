import {GetCategoriesInput} from '@/domain/category/repositories/CategoryRepository';
import {DataList, Response} from '@/domain/vo/BaseResponse';
import {useQuery, UseQueryOptions} from '@tanstack/react-query';
import Post from 'api/post';

import {GetCategoriesDataResponse} from '../types';

export const GetCategoriesQueryKey = () => ['Categories/list'] as const;

const GetCategories = async (
	input?: GetCategoriesInput,
): Promise<Response<DataList<GetCategoriesDataResponse>>> => {
	const response = await Post({
		endpoint: `/product-service/category/get-list`,
		data: input,
	});

	return {
		code: response?.code,
		data: response?.data,
		message: response?.message,
		more_info: response?.more_info,
	};
};

export const useGetCategoriesQuery = (
	input?: GetCategoriesInput,
	options?: UseQueryOptions<Response<DataList<GetCategoriesDataResponse>>>,
) =>
	useQuery<Response<DataList<GetCategoriesDataResponse>>>(
		GetCategoriesQueryKey(),
		() => GetCategories(input),
		{
			refetchOnWindowFocus: false,
			...options,
		},
	);
