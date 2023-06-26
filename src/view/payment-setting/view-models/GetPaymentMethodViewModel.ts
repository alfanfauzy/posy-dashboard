import {GetPaymentMethodListResponse} from '@/data/payment/types';
import {useGetPaymentMethodUsecase} from '@/data/payment/usecases/GetPaymentMethodUsecases';
import {
	GetFilterPaymentMethod,
	GetPaymentMethodsResult,
} from '@/domain/payment/repositories/PaymentRepositories';
import {DataList, Response} from '@/domain/vo/BaseResponse';
import {UseQueryOptions} from '@tanstack/react-query';

export const useGetPaymentMethodViewModal = (
	input?: GetFilterPaymentMethod,
	options?: UseQueryOptions<Response<DataList<GetPaymentMethodListResponse>>>,
): GetPaymentMethodsResult => {
	const result = useGetPaymentMethodUsecase(input, options);

	return result;
};
