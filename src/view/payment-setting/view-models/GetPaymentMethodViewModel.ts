import {GetPaymentMethodListResponse} from '@/data/payment/types';
import {useGetPaymentMethodUsecases} from '@/data/payment/usecases/GetPaymentMethodUsecase';
import {
	GetFilterPaymentMethod,
	GetPaymentMethodsResult,
} from '@/domain/payment/repositories/GetPaymentMethodRepository';
import {Response} from '@/domain/vo/BaseResponse';
import {UseQueryOptions} from '@tanstack/react-query';

export const useGetPaymentMethodViewModel = (
	input?: GetFilterPaymentMethod,
	options?: UseQueryOptions<Response<Array<GetPaymentMethodListResponse>>>,
): GetPaymentMethodsResult => {
	const result = useGetPaymentMethodUsecases(input, options);

	return result;
};
