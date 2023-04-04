import {GetPaymentMethodCategoriesInput} from '@/domain/payment-method/repositories/GetPaymentMethodCategoriesRepository';
import {DataList, Response} from '@/domain/vo/BaseResponse';
import {useQuery, UseQueryOptions} from '@tanstack/react-query';
import Post from 'api/post';

import {GetPaymentMethodCategoriesDataResponse} from '../types/GetPaymentMethodCategoriesType';

export const GetPaymentMethodCategoriesQueryKey =
	'PaymentMethodCategories/list' as const;

const GetPaymentMethodCategories = async (
	input?: GetPaymentMethodCategoriesInput,
): Promise<Response<DataList<GetPaymentMethodCategoriesDataResponse>>> => {
	const response = await Post({
		endpoint: `/order-service/transaction/payment/method-category/get-list`,
		data: input,
	});

	return {
		code: response?.code,
		data: response?.data,
		message: response?.message,
		more_info: response?.more_info,
	};
};

export const useGetPaymentMethodCategoriesQuery = (
	input?: GetPaymentMethodCategoriesInput,
	options?: UseQueryOptions<
		Response<DataList<GetPaymentMethodCategoriesDataResponse>>
	>,
) =>
	useQuery<Response<DataList<GetPaymentMethodCategoriesDataResponse>>>(
		[GetPaymentMethodCategoriesQueryKey, input],
		() => GetPaymentMethodCategories(input),
		{
			refetchOnWindowFocus: false,
			...options,
		},
	);
