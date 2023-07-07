import Post from '@/data/common/api/post';
import {GetMasterProductsInput} from '@/domain/product/repositories/GetMasterProductsRepository';
import {useQuery, UseQueryOptions} from '@tanstack/react-query';
import {AxiosError} from 'axios';

import {DataList, Response} from '../../../domain/vo/BaseResponse';
import {GetListProductDataResponse} from '../types/MasterProduct';

export const GetMasterProductsQueryKey = 'product-master/list';

export const GetMasterProducts = async (
	input: GetMasterProductsInput,
): Promise<Response<DataList<GetListProductDataResponse>>> => {
	try {
		const response = await Post({
			endpoint: `/product-service/product/get-list`,
			data: input,
		});

		return response;
	} catch (error) {
		const err = error as AxiosError;
		throw err.response?.data;
	}
};

export const useGetMasterProductsQuery = (
	input: GetMasterProductsInput,
	options?: UseQueryOptions<Response<DataList<GetListProductDataResponse>>>,
) =>
	useQuery<Response<DataList<GetListProductDataResponse>>>(
		[GetMasterProductsQueryKey, JSON.stringify(input)],
		() => GetMasterProducts(input),
		{
			enabled: !!JSON.stringify(input),
			...options,
		},
	);
