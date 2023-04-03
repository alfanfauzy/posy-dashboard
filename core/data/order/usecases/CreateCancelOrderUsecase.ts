import {MutationOptions} from '@/data/common/types';
import {
	CreateCancelOrderInput,
	CreateCancelOrderRepository,
} from '@/domain/order/repositories/CreateCancelOrderRepository';

import {mapToCreateCancelOrderModel} from '../mappers/OrderMapper';
import {useCreateCancelOrderMutation} from '../sources/CreateCancelOrderMutation';
import {CreateCancelOrderDataResponse} from '../types/CreateCancelOrderType';

export const useCreateCancelOrderUsecase = (
	options?: MutationOptions<CreateCancelOrderDataResponse>,
): CreateCancelOrderRepository => {
	const {mutate, data, ...rest} = useCreateCancelOrderMutation(options);

	const createCancelOrder = (input: CreateCancelOrderInput) => {
		mutate(input);
	};

	if (data?.data) {
		return {
			createCancelOrder,
			data: mapToCreateCancelOrderModel(data?.data),
			...rest,
		};
	}

	return {
		createCancelOrder,
		data: undefined,
		...rest,
	};
};
