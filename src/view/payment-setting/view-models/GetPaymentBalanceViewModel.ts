import {GetPaymentBalanceResponse} from '@/data/payment/types';
import {useGetPaymentBalanceUsecases} from '@/data/payment/usecases/GetPaymentBalanceUsecases';
import {GetPaymentBalanceResult} from '@/domain/payment/repositories/PaymentRepositories';
import {Response} from '@/domain/vo/BaseResponse';
import {UseQueryOptions} from '@tanstack/react-query';

export const useGetPaymentBalanceViewModel = (
	options?: UseQueryOptions<Response<GetPaymentBalanceResponse>>,
): GetPaymentBalanceResult => {
	const result = useGetPaymentBalanceUsecases(options);

	return result;
};
