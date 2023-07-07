import Get from '@/data/common/api/get';
import {useQuery, UseQueryOptions} from '@tanstack/react-query';
import {AxiosError} from 'axios';

import {Response} from '../../../domain/vo/BaseResponse';
import {GetDetailProductResponse} from '../types/MasterProduct';

const GetProductQueryKey = 'product/detail';

export const GetMasterProduct = async (
	productId: string,
): Promise<Response<GetDetailProductResponse>> => {
	try {
		const response = await Get({
			endpoint: `/product-service/product/get-detail/${productId}`,
		});

		return response;
	} catch (error) {
		const err = error as AxiosError;
		throw err.response?.data;
	}
};

export const useGetMasterProductQuery = (
	productId: string,
	options?: UseQueryOptions<Response<GetDetailProductResponse>>,
) =>
	useQuery<Response<GetDetailProductResponse>>(
		[GetProductQueryKey, JSON.stringify(productId)],
		() => GetMasterProduct(productId),
		{
			enabled: !!JSON.stringify(productId),
			...options,
		},
	);
