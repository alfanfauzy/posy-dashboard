import {MutationOptions} from '@/data/common/types';
import {CreateServeOrderDataResponse} from '@/data/order/types/CreateServeOrderType';
import {useCreateServeOrderUsecase} from '@/data/order/usecases/CreateServeOrderUsecase';
import {CreateServeOrderRepository} from '@/domain/order/repositories/CreateServeOrderRepository';

export const useCreateServeOrderViewModel = (
	options?: MutationOptions<CreateServeOrderDataResponse>,
): CreateServeOrderRepository => {
	const result = useCreateServeOrderUsecase(options);

	return result;
};
