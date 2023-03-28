import {MutationOptions} from '@/data/common/types';
import {CreateOrderManualDataResponse} from '@/data/order/types';
import {useCreateOrderManualUsecase} from '@/data/order/usecases/CreateOrderManualUsecase';
import {CreateOrderManualRepository} from '@/domain/order/repositories/OrderRepository';

export const useCreateOrderManualViewModel = (
	options?: MutationOptions<CreateOrderManualDataResponse>,
): CreateOrderManualRepository => {
	const result = useCreateOrderManualUsecase(options);

	return result;
};
