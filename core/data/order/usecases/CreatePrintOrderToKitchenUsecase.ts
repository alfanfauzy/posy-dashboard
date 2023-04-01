import {MutationOptions} from '@/data/common/types';
import {
	CreatePrintOrderToKitchenInput,
	CreatePrintOrderToKitchenRepository,
} from '@/domain/order/repositories/CreatePrintOrderToKitchenRepository';

import {mapToCreatePrintOrderToKitchenModel} from '../mappers/OrderMapper';
import {useCreatePrintOrderToKitchenMutation} from '../sources/CreatePrintOrderToKitchenMutation';
import {CreatePrintOrderToKitchenDataResponse} from '../types';

export const useCreatePrintOrderToKitchenUsecase = (
	options?: MutationOptions<CreatePrintOrderToKitchenDataResponse>,
): CreatePrintOrderToKitchenRepository => {
	const {mutate, data, ...rest} = useCreatePrintOrderToKitchenMutation(options);

	const createPrintOrderToKitchen = (input: CreatePrintOrderToKitchenInput) => {
		mutate(input);
	};

	if (data?.data) {
		return {
			createPrintOrderToKitchen,
			data: mapToCreatePrintOrderToKitchenModel(data?.data),
			...rest,
		};
	}

	return {
		createPrintOrderToKitchen,
		data: undefined,
		...rest,
	};
};
