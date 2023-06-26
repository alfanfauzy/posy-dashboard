import {mapToPaymentMethod} from '@/data/payment/mappers/PaymentMethodMapper';
import {useGetPaymentMethodQuery} from '@/data/payment/sources/GetPaymentMethodQuery';
import {GetPaymentMethodListResponse} from '@/data/payment/types';
import {
	GetFilterPaymentMethod,
	GetPaymentMethodsResult,
} from '@/domain/payment/repositories/GetPaymentMethodRepository';
import {DataList, Response} from '@/domain/vo/BaseResponse';
import {UseQueryOptions} from '@tanstack/react-query';

export const useGetPaymentMethodUsecases = (
	input?: GetFilterPaymentMethod,
	options?: UseQueryOptions<Response<DataList<GetPaymentMethodListResponse>>>,
): GetPaymentMethodsResult => {
	const {data, ...rest} = useGetPaymentMethodQuery(input, options);

	if (data?.data.objs) {
		const paymentMethodMapper = mapToPaymentMethod(data.data.objs);

		return {
			data: paymentMethodMapper,
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
