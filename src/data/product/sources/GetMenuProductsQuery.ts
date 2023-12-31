import Post from '@/data/common/api/post';
import {GetMenuProductsInput} from '@/domain/product/repositories/GetMenuProductsRepository';
import {DataList, Response} from '@/domain/vo/BaseResponse';
import {useQuery, UseQueryOptions} from '@tanstack/react-query';

import {GetMenuProductsDataResponse} from '../types/GetMenuProductsType';

export const GetMenuProductsQueryKey = 'Products/list';

const GetMenuProducts = async (
	input: GetMenuProductsInput,
): Promise<Response<DataList<GetMenuProductsDataResponse>>> => {
	const response = await Post({
		endpoint: `/product-service/product/get-menu-product-list`,
		data: input,
	});

	return {
		code: response?.code,
		data: response?.data,
		message: response?.message,
		more_info: response?.more_info,
	};
};

export const useGetMenuProductsQuery = (
	input: GetMenuProductsInput,
	options?: UseQueryOptions<Response<DataList<GetMenuProductsDataResponse>>>,
) =>
	useQuery<Response<DataList<GetMenuProductsDataResponse>>>(
		[GetMenuProductsQueryKey, JSON.stringify(input)],
		() => GetMenuProducts(input),
		{
			refetchOnWindowFocus: false,
			...options,
		},
	);
