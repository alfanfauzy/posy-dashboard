import Post from '@/data/common/api/post';
import {GetFilterPaymentMethodCategory} from '@/domain/payment/repositories/PaymentRepositories';
import {DataList, Response} from '@/domain/vo/BaseResponse';
import {useQuery, UseQueryOptions} from '@tanstack/react-query';
import {AxiosError} from 'axios';

import {GetPaymentMethodCategoryListResponse} from '../types/index';

export const GetPaymentMethodCategory = async (
	input?: GetFilterPaymentMethodCategory,
): Promise<Response<DataList<GetPaymentMethodCategoryListResponse>>> => {
	try {
		const response = await Post({
			endpoint: `/api/fnb-order-service/internal/payment/method-category/get-list`,
			data: input,
		});

		return response;
	} catch (error) {
		const err = error as AxiosError;
		throw err.response?.data;
	}
};

export const useGetPaymentMethodCategoryQuery = (
	input?: GetFilterPaymentMethodCategory,
	options?: UseQueryOptions<
		Response<DataList<GetPaymentMethodCategoryListResponse>>
	>,
) =>
	useQuery<Response<DataList<GetPaymentMethodCategoryListResponse>>>(
		['payment-method-category/list', JSON.stringify(input)],
		() => GetPaymentMethodCategory(input),
		{
			enabled: !!JSON.stringify(input),
			...options,
		},
	);
