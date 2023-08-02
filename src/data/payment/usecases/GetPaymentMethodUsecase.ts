import {mapToPaymentMethod} from '@/data/payment/mappers/PaymentMethodMapper';
import {useGetPaymentMethodQuery} from '@/data/payment/sources/GetPaymentMethodQuery';
import {GetPaymentMethodListResponse} from '@/data/payment/types';
import {
	GetFilterPaymentMethod,
	GetPaymentMethodsResult,
} from '@/domain/payment/repositories/GetPaymentMethodRepository';
import {Response} from '@/domain/vo/BaseResponse';
import {UseQueryOptions} from '@tanstack/react-query';

export const useGetPaymentMethodUsecases = (
	input?: GetFilterPaymentMethod,
	options?: UseQueryOptions<Response<Array<GetPaymentMethodListResponse>>>,
): GetPaymentMethodsResult => {
	const {data, ...rest} = useGetPaymentMethodQuery(input, options);

	if (data?.data) {
		const paymentMethodMapper = mapToPaymentMethod(data.data);

		return {
			data: paymentMethodMapper,
			...rest,
		};
	}

	return {
		data: undefined,
		...rest,
	};
};
