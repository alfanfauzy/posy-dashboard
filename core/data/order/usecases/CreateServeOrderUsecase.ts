import {MutationOptions} from '@/data/common/types';
import {
	CreateServeOrderInput,
	CreateServeOrderRepository,
} from '@/domain/order/repositories/CreateServeOrderRepository';

import {mapToCreateServeOrderModel} from '../mappers/OrderMapper';
import {useCreateServeOrderMutation} from '../sources/CreateServeOrderMutation';
import {CreateServeOrderDataResponse} from '../types/CreateServeOrderType';

export const useCreateServeOrderUsecase = (
	options?: MutationOptions<CreateServeOrderDataResponse>,
): CreateServeOrderRepository => {
	const {mutate, data, ...rest} = useCreateServeOrderMutation(options);

	const createServeOrder = (input: CreateServeOrderInput) => {
		mutate(input);
	};

	if (data?.data) {
		return {
			createServeOrder,
			data: mapToCreateServeOrderModel(data?.data),
			...rest,
		};
	}

	return {
		createServeOrder,
		data: undefined,
		...rest,
	};
};
