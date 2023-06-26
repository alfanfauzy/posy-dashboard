import Post from '@/data/common/api/post';
import {GetPaymentMethodListResponse} from '@/data/payment/types/index';
import {GetFilterPaymentMethod} from '@/domain/payment/repositories/PaymentRepositories';
import {DataList, Response} from '@/domain/vo/BaseResponse';
import {useQuery, UseQueryOptions} from '@tanstack/react-query';
import {AxiosError} from 'axios';

export const GetPaymentMethodQueryKey = 'payment-method/list';

export const GetPaymentMethod = async (
	input?: GetFilterPaymentMethod,
): Promise<Response<DataList<GetPaymentMethodListResponse>>> => {
	try {
		const response = await Post({
			endpoint: `/order-service/transaction/payment/method/v2/get-list`,
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
	options?: UseQueryOptions<Response<DataList<GetPaymentMethodListResponse>>>,
) =>
	useQuery<Response<DataList<GetPaymentMethodListResponse>>>(
		[GetPaymentMethodQueryKey, JSON.stringify(input)],
		() => GetPaymentMethod(input),
		{
			enabled: !!JSON.stringify(input),
			...options,
		},
	);
