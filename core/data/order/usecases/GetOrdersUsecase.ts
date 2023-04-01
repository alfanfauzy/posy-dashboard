import {
	GetOrdersInput,
	GetOrdersResult,
} from '@/domain/order/repositories/GetOrdersRepository';
import {DataList, Response} from '@/domain/vo/BaseResponse';
import {UseQueryOptions} from '@tanstack/react-query';

import {mapToOrdersModel} from '../mappers/OrderMapper';
import {useGetOrdersQuery} from '../sources/GetOrdersQuery';
import {GetOrdersDataResponse} from '../types';

export const useGetOrdersUsecase = (
	input: GetOrdersInput,
	options?: UseQueryOptions<Response<DataList<GetOrdersDataResponse>>>,
): GetOrdersResult => {
	const {data, ...rest} = useGetOrdersQuery(input, options);

	if (data?.data?.objs) {
		const dataMapper = mapToOrdersModel(data.data.objs);

		return {
			data: dataMapper,
			...rest,
		};
	}

	return {
		data: undefined,
		...rest,
	};
};
