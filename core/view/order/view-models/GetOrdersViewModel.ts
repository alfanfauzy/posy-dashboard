import {GetOrdersDataResponse} from '@/data/order/types';
import {useGetOrdersUsecase} from '@/data/order/usecases/GetOrdersUsecase';
import {
	GetOrdersInput,
	GetOrdersResult,
} from '@/domain/order/repositories/GetOrdersRepository';
import {DataList, Response} from '@/domain/vo/BaseResponse';
import {UseQueryOptions} from '@tanstack/react-query';

export const useGetOrdersViewModel = (
	input: GetOrdersInput,
	options?: UseQueryOptions<Response<DataList<GetOrdersDataResponse>>>,
): GetOrdersResult => {
	const result = useGetOrdersUsecase(input, options);

	return result;
};
