import Post from '@/data/common/api/post';
import {GetPaymentMethodsInput} from '@/domain/payment-method/repositories/GetPaymentMethodsRepository';
import {DataList, Response} from '@/domain/vo/BaseResponse';
import {useQuery, UseQueryOptions} from '@tanstack/react-query';

import {GetPaymentMethodsDataResponse} from '../types/GetPaymentMethodsType';

export const GetPaymentMethodsQueryKey = 'PaymentMethods/list' as const;

const GetPaymentMethods = async (
	input?: GetPaymentMethodsInput,
): Promise<Response<DataList<GetPaymentMethodsDataResponse>>> => {
	const response = await Post({
		endpoint: `/order-service/transaction/payment/method/get-list/${input?.payment_method_category_uuid}`,
		data: input,
	});

	return {
		code: response?.code,
		data: response?.data,
		message: response?.message,
		more_info: response?.more_info,
	};
};

export const useGetPaymentMethodsQuery = (
	input?: GetPaymentMethodsInput,
	options?: UseQueryOptions<Response<DataList<GetPaymentMethodsDataResponse>>>,
) =>
	useQuery<Response<DataList<GetPaymentMethodsDataResponse>>>(
		[GetPaymentMethodsQueryKey, input],
		() => GetPaymentMethods(input),
		{
			refetchOnWindowFocus: false,
			...options,
		},
	);
