import {MutationOptions} from '@/data/common/types';
import {useUpdatePaymentMethodCategoryMutation} from '@/data/payment/sources/UpdateMethodCategoryMutation';
import {PaymentMethodCategoryPayload} from '@/domain/payment/models';

export const useUpdatePaymentMethodCategoryUsecases = ({
	...options
}: MutationOptions) => {
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
