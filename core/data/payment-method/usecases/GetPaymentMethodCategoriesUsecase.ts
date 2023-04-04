import {
	GetPaymentMethodCategoriesInput,
	GetPaymentMethodCategoriesResult,
} from '@/domain/payment-method/repositories/GetPaymentMethodCategoriesRepository';
import {DataList, Response} from '@/domain/vo/BaseResponse';
import {UseQueryOptions} from '@tanstack/react-query';

import {mapToPaymentMethodCategoriesModel} from '../mappers/PaymentMethodMapper';
import {useGetPaymentMethodCategoriesQuery} from '../sources/GetPaymentMethodCategoriesQuery';
import {GetPaymentMethodCategoriesDataResponse} from '../types/GetPaymentMethodCategoriesType';

export const useGetPaymentMethodCategoriesUsecase = (
	input?: GetPaymentMethodCategoriesInput,
	options?: UseQueryOptions<
		Response<DataList<GetPaymentMethodCategoriesDataResponse>>
	>,
): GetPaymentMethodCategoriesResult => {
	const {data, ...rest} = useGetPaymentMethodCategoriesQuery(input, options);

	if (data?.data?.objs) {
		const dataMapper = mapToPaymentMethodCategoriesModel(data.data.objs);

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
