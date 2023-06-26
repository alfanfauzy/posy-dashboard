import {MutationOptions} from '@/data/common/types';
import {useUpdatePaymentMethodCategoryByRestaurantUsecases} from '@/data/payment/usecases/UpdatePaymentMethodCategoryByRestaurantUsecases';
import {UpdatePaymentMethodCategoryRepository} from '@/domain/payment/repositories/PaymentRepositories';

export const useUpdatePaymentMethodCategoryByRestaurantViewModal = ({
	...options
}: MutationOptions): UpdatePaymentMethodCategoryRepository => {
	const result = useUpdatePaymentMethodCategoryByRestaurantUsecases(options);

	return result;
};
