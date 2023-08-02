import Post from '@/data/common/api/post';
import {GetPaymentMethodListResponse} from '@/data/payment/types/index';
import {GetFilterPaymentMethod} from '@/domain/payment/repositories/GetPaymentMethodRepository';
import {DataList, Response} from '@/domain/vo/BaseResponse';
import {useQuery, UseQueryOptions} from '@tanstack/react-query';
import {AxiosError} from 'axios';

export const GetPaymentMethodQueryKey = 'payment-method/list';

export const GetPaymentMethod = async (
	input?: GetFilterPaymentMethod,
): Promise<Response<Array<GetPaymentMethodListResponse>>> => {
	try {
		const response = await Post({
			endpoint: `/order-service/v2/payment-method/get-list`,
			data: input,
		});

		return response;
	} catch (error) {
		const err = error as AxiosError;
		throw err.response?.data;
	}
};

export const useGetPaymentMethodQuery = (
	input?: GetFilterPaymentMethod,
	options?: UseQueryOptions<Response<Array<GetPaymentMethodListResponse>>>,
) =>
	useQuery<Response<Array<GetPaymentMethodListResponse>>>(
		[GetPaymentMethodQueryKey, JSON.stringify(input)],
		() => GetPaymentMethod(input),
		{
			enabled: !!JSON.stringify(input),
			...options,
		},
	);
