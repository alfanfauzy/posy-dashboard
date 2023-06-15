import {useUpdatePaymentMethodCategoryByRestaurantMutationMutation} from '@/data/payment/sources/UpdateMethodCategoryByRestaurantMutation';
import {UpdatePaymentMethodCategoryResponse} from '@/data/payment/types';
import {PaymentMethodCategoryByRestaurantPayload} from '@/domain/payment/models';
import {Response} from '@/domain/vo/BaseResponse';
import {UseMutationOptions} from '@tanstack/react-query';
import {AxiosError} from 'axios';

export const useUpdatePaymentMethodCategoryByRestaurantUsecase = (
	options?: UseMutationOptions<
		Response<UpdatePaymentMethodCategoryResponse>,
		AxiosError<Response>,
		PaymentMethodCategoryByRestaurantPayload
	>,
): any => {
	const {mutate, data, ...rest} =
		useUpdatePaymentMethodCategoryByRestaurantMutationMutation(options);

	const updatePaymentMethodCategory = (
		payload: PaymentMethodCategoryByRestaurantPayload,
	) => {
		mutate(payload);
	};

	return {
		updatePaymentMethodCategory,
		data: data?.data.success,
		...rest,
	};
};
