import {GetPaymentMethodCategoriesDataResponse} from '@/data/payment-method/types/GetPaymentMethodCategoriesType';
import {useGetPaymentMethodCategoriesUsecase} from '@/data/payment-method/usecases/GetPaymentMethodCategoriesUsecase';
import {
	GetPaymentMethodCategoriesInput,
	GetPaymentMethodCategoriesResult,
} from '@/domain/payment-method/repositories/GetPaymentMethodCategoriesRepository';
import {DataList, Response} from '@/domain/vo/BaseResponse';
import {UseQueryOptions} from '@tanstack/react-query';

export const useGetPaymentMethodCategoriesViewModel = (
	input?: GetPaymentMethodCategoriesInput,
	options?: UseQueryOptions<
		Response<DataList<GetPaymentMethodCategoriesDataResponse>>
	>,
): GetPaymentMethodCategoriesResult => {
	const result = useGetPaymentMethodCategoriesUsecase(input, options);

	return result;
};
