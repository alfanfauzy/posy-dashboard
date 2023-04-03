import {MutationOptions} from '@/data/common/types';
import {CreateCancelOrderDataResponse} from '@/data/order/types/CreateCancelOrderType';
import {useCreateCancelOrderUsecase} from '@/data/order/usecases/CreateCancelOrderUsecase';
import {CreateCancelOrderRepository} from '@/domain/order/repositories/CreateCancelOrderRepository';

export const useCreateCancelOrderViewModel = (
	options?: MutationOptions<CreateCancelOrderDataResponse>,
): CreateCancelOrderRepository => {
	const result = useCreateCancelOrderUsecase(options);

	return result;
};
