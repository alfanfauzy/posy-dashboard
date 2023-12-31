import {MutationOptions} from '@/data/common/types';
import {useUpdatePaymentMethodCategoryByRestaurantMutation} from '@/data/payment/sources/UpdateMethodCategoryByRestaurantMutation';
import {PaymentMethodCategoryByRestaurantPayload} from '@/domain/payment/models';
import {UpdatePaymentMethodCategoryRepository} from '@/domain/payment/repositories/UpdatePaymentMethodCategoriesRepository';

export const useUpdatePaymentMethodCategoryByRestaurantUsecases = ({
	...options
}: MutationOptions): UpdatePaymentMethodCategoryRepository => {
	const {mutate, data, ...rest} =
		useUpdatePaymentMethodCategoryByRestaurantMutation(options);

	const updatePaymentMethodCategory = (
		payload: PaymentMethodCategoryByRestaurantPayload,
	) => {
		mutate(payload);
	};

	return {
		updatePaymentMethodCategory,
		data: data?.data,
		...rest,
	};
};
