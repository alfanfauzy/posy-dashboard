import {GetMenuProductsInput} from '@/domain/product/repositories/ProductRepository';
import {DataList, Response} from '@/domain/vo/BaseResponse';
import {useQuery, UseQueryOptions} from '@tanstack/react-query';
import Post from 'api/post';

import {GetMenuProductsDataResponse} from '../types/MenuProduct';

export const GetMenuProductsQueryKey = (input?: GetMenuProductsInput) =>
	['Products/list', input] as const;

const GetMenuProducts = async (
	input: GetMenuProductsInput,
): Promise<Response<DataList<GetMenuProductsDataResponse>>> => {
	const response = await Post({
		endpoint: `/product-service/product/get-menu-product-list`,
		data: input,
	});

	return {
		code: response?.code,
		data: response?.data as any,
		message: response?.message,
		more_info: response?.more_info,
	};
};

export const useGetMenuProductsQuery = (
	input: GetMenuProductsInput,
	options?: UseQueryOptions<Response<DataList<GetMenuProductsDataResponse>>>,
) =>
	useQuery<Response<DataList<GetMenuProductsDataResponse>>>(
		GetMenuProductsQueryKey(input),
		() => GetMenuProducts(input),
		{
			refetchOnWindowFocus: false,
			...options,
		},
	);
