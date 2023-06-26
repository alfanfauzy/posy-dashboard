import {MutationOptions} from '@/data/common/types';
import {useUpdatePaymentMethodCategoryByRestaurantUsecases} from '@/data/payment/usecases/UpdatePaymentMethodCategoryByRestaurantUsecase';
import {UpdatePaymentMethodCategoryRepository} from '@/domain/payment/repositories/UpdatePaymentMethodCategoriesRepository';

export const useUpdatePaymentMethodCategoryByRestaurantViewModal = ({
	...options
}: MutationOptions): UpdatePaymentMethodCategoryRepository => {
	const result = useUpdatePaymentMethodCategoryByRestaurantUsecases(options);

	return result;
};
