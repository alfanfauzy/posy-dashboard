import {MutationOptions} from '@/data/common/types';
import {useCreateServeOrderUsecase} from '@/data/order/usecases/CreateServeOrderUsecase';
import {CreateServeOrderRepository} from '@/domain/order/repositories/CreateServeOrderRepository';

export const useCreateServeOrderViewModel = (
	options: MutationOptions,
): CreateServeOrderRepository => {
	const result = useCreateServeOrderUsecase(options);

	return result;
};
