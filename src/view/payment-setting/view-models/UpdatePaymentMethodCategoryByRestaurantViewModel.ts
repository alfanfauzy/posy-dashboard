import {UpdatePaymentMethodCategoryResponse} from '@/data/payment/types';
import {useUpdatePaymentMethodCategoryByRestaurantUsecase} from '@/data/payment/usecases/UpdatePaymentMethodCategoryByRestaurantUsecase';
import {PaymentMethodCategoryByRestaurantPayload} from '@/domain/payment/models';
import {UpdatePaymentMethodCategoryRepository} from '@/domain/payment/repositories/PaymentRepositories';
import {Response} from '@/domain/vo/BaseResponse';
import {UseMutationOptions} from '@tanstack/react-query';
import {AxiosError} from 'axios';

export const useUpdatePaymentMethodCategoryByRestaurantViewModal = (
	options?: UseMutationOptions<
		Response<UpdatePaymentMethodCategoryResponse>,
		AxiosError<Response>,
		PaymentMethodCategoryByRestaurantPayload
	>,
): UpdatePaymentMethodCategoryRepository => {
	const result = useUpdatePaymentMethodCategoryByRestaurantUsecase(options);

	return result;
};
