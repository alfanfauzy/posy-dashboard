import {GetPaymentAccountInfoResponse} from '@/data/payment/types';
import {useGetPaymentAccountInfoUsecases} from '@/data/payment/usecases/GetPaymentAccountInfoUsecase';
import {GetPaymentAccountInfoResult} from '@/domain/payment/repositories/GetPaymentAccountInfoRepository';
import {Response} from '@/domain/vo/BaseResponse';
import {UseQueryOptions} from '@tanstack/react-query';

export const useGetPaymentAccountInfoViewModel = (
	options?: UseQueryOptions<Response<GetPaymentAccountInfoResponse>>,
): GetPaymentAccountInfoResult => {
	const result = useGetPaymentAccountInfoUsecases(options);

	return result;
};
