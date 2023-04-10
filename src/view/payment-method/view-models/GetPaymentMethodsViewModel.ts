import {GetPaymentMethodsDataResponse} from '@/data/payment-method/types/GetPaymentMethodsType';
import {useGetPaymentMethodsUsecase} from '@/data/payment-method/usecases/GetPaymentMethodsUsecase';
import {
	GetPaymentMethodsInput,
	GetPaymentMethodsResult,
} from '@/domain/payment-method/repositories/GetPaymentMethodsRepository';
import {DataList, Response} from '@/domain/vo/BaseResponse';
import {UseQueryOptions} from '@tanstack/react-query';

export const useGetPaymentMethodsViewModel = (
	input?: GetPaymentMethodsInput,
	options?: UseQueryOptions<Response<DataList<GetPaymentMethodsDataResponse>>>,
): GetPaymentMethodsResult => {
	const result = useGetPaymentMethodsUsecase(input, options);

	return result;
};
