import {GetPaymentMethodListResponse} from '@/data/payment/types';
import {useGetPaymentMethodUsecases} from '@/data/payment/usecases/GetPaymentMethodUsecase';
import {
	GetFilterPaymentMethod,
	GetPaymentMethodsResult,
} from '@/domain/payment/repositories/GetPaymentMethodRepository';
import {DataList, Response} from '@/domain/vo/BaseResponse';
import {UseQueryOptions} from '@tanstack/react-query';

export const useGetPaymentMethodViewModal = (
	input?: GetFilterPaymentMethod,
	options?: UseQueryOptions<Response<DataList<GetPaymentMethodListResponse>>>,
): GetPaymentMethodsResult => {
	const result = useGetPaymentMethodUsecases(input, options);

	return result;
};
