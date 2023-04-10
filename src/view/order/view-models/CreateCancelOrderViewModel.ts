import {MutationOptions} from '@/data/common/types';
import {useCreateCancelOrderUsecase} from '@/data/order/usecases/CreateCancelOrderUsecase';
import {CreateCancelOrderRepository} from '@/domain/order/repositories/CreateCancelOrderRepository';

export const useCreateCancelOrderViewModel = (
	options: MutationOptions,
): CreateCancelOrderRepository => {
	const result = useCreateCancelOrderUsecase(options);

	return result;
};
