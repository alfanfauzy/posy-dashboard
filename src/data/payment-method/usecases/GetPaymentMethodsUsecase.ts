import {
	GetPaymentMethodsInput,
	GetPaymentMethodsResult,
} from '@/domain/payment-method/repositories/GetPaymentMethodsRepository';
import {DataList, Response} from '@/domain/vo/BaseResponse';
import {UseQueryOptions} from '@tanstack/react-query';

import {mapToPaymentMethodsModel} from '../mappers/PaymentMethodMapper';
import {useGetPaymentMethodsQuery} from '../sources/GetPaymentMethodsQuery';
import {GetPaymentMethodsDataResponse} from '../types/GetPaymentMethodsType';

export const useGetPaymentMethodsUsecase = (
	input?: GetPaymentMethodsInput,
	options?: UseQueryOptions<Response<DataList<GetPaymentMethodsDataResponse>>>,
): GetPaymentMethodsResult => {
	const {data, ...rest} = useGetPaymentMethodsQuery(input, options);

	if (data?.data?.objs) {
		const dataMapper = mapToPaymentMethodsModel(data.data.objs);

		return {
			data: dataMapper,
			pagination: {
				curr_page: data.data.curr_page,
				per_page: data.data.per_page,
				total_objs: data.data.total_objs,
				total_page: data.data.total_page,
			},
			...rest,
		};
	}

	return {
		data: undefined,
		pagination: undefined,
		...rest,
	};
};
