import {mapToPaymentBalance} from '@/data/payment/mappers/PaymentMethodMapper';
import {GetPaymentBalanceResponse} from '@/data/payment/types';
import {GetPaymentBalanceResult} from '@/domain/payment/repositories/GetPaymentBalanceRepository';
import {Response} from '@/domain/vo/BaseResponse';
import {UseQueryOptions} from '@tanstack/react-query';

import {useGetPaymentBalanceQuery} from '../sources/GetPaymentBalanceQuery';

export const useGetPaymentBalanceUsecases = (
	options?: UseQueryOptions<Response<GetPaymentBalanceResponse>>,
): GetPaymentBalanceResult => {
	const {data, ...rest} = useGetPaymentBalanceQuery(options);

	if (data?.data) {
		const paymentBalance = mapToPaymentBalance(data.data);

		return {
			data: paymentBalance,
			...rest,
		};
	}

	return {
		data: undefined,
		...rest,
	};
};
