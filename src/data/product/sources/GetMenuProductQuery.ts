import Post from '@/data/common/api/post';
import {GetMenuProductInput} from '@/domain/product/repositories/GetMenuProductRepository';
import {Response} from '@/domain/vo/BaseResponse';
import {useQuery, UseQueryOptions} from '@tanstack/react-query';

import {GetMenuProductDataResponse} from '../types/GetMenuProductType';

export const GetMenuProductQueryKey = 'Products/detail';

const GetMenuProduct = async (
	input: GetMenuProductInput,
): Promise<Response<GetMenuProductDataResponse>> => {
	const response = await Post({
		endpoint: `/product-service/product/get-menu-product-detail/${input?.product_uuid}`,
		data: {
			restaurant_outlet_uuid: input.restaurant_outlet_uuid,
		},
	});

	return {
		code: response?.code,
		data: response?.data,
		message: response?.message,
		more_info: response?.more_info,
	};
};

export const useGetMenuProductQuery = (
	input: GetMenuProductInput,
	options?: UseQueryOptions<Response<GetMenuProductDataResponse>>,
) =>
	useQuery<Response<GetMenuProductDataResponse>>(
		[GetMenuProductQueryKey, JSON.stringify(input)],
		() => GetMenuProduct(input),
		{
			refetchOnWindowFocus: false,
			...options,
		},
	);
