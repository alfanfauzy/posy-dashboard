import {GetOutletProductInput} from '@/domain/product/repositories/GetOutletProductRepository';
import {Response} from '@/domain/vo/BaseResponse';
import {useQuery, UseQueryOptions} from '@tanstack/react-query';
import Get from 'api/get';

import {GetOutletProductDataResponse} from '../types/OutletProduct';

export const GetOutletProductQueryKey = 'Product-outlet/detail' as const;

const GetOutletProduct = async (
	input: GetOutletProductInput,
): Promise<Response<GetOutletProductDataResponse>> => {
	const response = await Get({
		endpoint: `/product-service/product-outlet/get-detail/${input.restaurant_outlet_uuid}/${input?.product_uuid}`,
	});

	return {
		code: response?.code,
		data: response?.data,
		message: response?.message,
		more_info: response?.more_info,
	};
};

export const useGetOutletProductQuery = (
	input: GetOutletProductInput,
	options?: UseQueryOptions<Response<GetOutletProductDataResponse>>,
) =>
	useQuery<Response<GetOutletProductDataResponse>>(
		[GetOutletProductQueryKey, input],
		() => GetOutletProduct(input),
		{
			refetchOnWindowFocus: false,
			...options,
		},
	);
