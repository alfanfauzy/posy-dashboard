import Get from '@/data/common/api/get';
import {GetOrdersInput} from '@/domain/order/repositories/GetOrdersRepository';
import {DataList, Response} from '@/domain/vo/BaseResponse';
import {useQuery, UseQueryOptions} from '@tanstack/react-query';

import {GetOrdersDataResponse} from '../types';

export const GetOrdersQueryKey = 'Orders/list' as const;

const GetOrders = async (
	input: GetOrdersInput,
): Promise<Response<DataList<GetOrdersDataResponse>>> => {
	const response = await Get({
		endpoint: `/order-service/order/get-list/${input.transaction_uuid}`,
	});

	return {
		code: response?.code,
		data: response?.data,
		message: response?.message,
		more_info: response?.more_info,
	};
};

export const useGetOrdersQuery = (
	input: GetOrdersInput,
	options?: UseQueryOptions<Response<DataList<GetOrdersDataResponse>>>,
) =>
	useQuery<Response<DataList<GetOrdersDataResponse>>>(
		[GetOrdersQueryKey, input],
		() => GetOrders(input),
		{
			refetchOnWindowFocus: false,
			...options,
		},
	);
