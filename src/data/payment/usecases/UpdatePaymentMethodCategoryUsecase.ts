import {useUpdatePaymentMethodCategoryMutation} from '@/data/payment/sources/UpdateMethodCategoryMutation';
import {UpdatePaymentMethodCategoryResponse} from '@/data/payment/types';
import {PaymentMethodCategoryPayload} from '@/domain/payment/models';
import {Response} from '@/domain/vo/BaseResponse';
import {UseMutationOptions} from '@tanstack/react-query';
import {AxiosError} from 'axios';

export const useUpdatePaymentMethodCategoryUsecase = (
	options?: UseMutationOptions<
		Response<UpdatePaymentMethodCategoryResponse>,
		AxiosError<Response>,
		PaymentMethodCategoryPayload
	>,
): any => {
	const {mutate, data, ...rest} =
		useUpdatePaymentMethodCategoryMutation(options);

	const updatePaymentMethodCategory = (
		payload: PaymentMethodCategoryPayload,
	) => {
		mutate(payload);
	};

	return {
		updatePaymentMethodCategory,
		data: data?.data.success,
		...rest,
	};
};
