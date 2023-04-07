import {MutationOptions} from '@/data/common/types';
import {useCreateOrderManualUsecase} from '@/data/order/usecases/CreateOrderManualUsecase';
import {CreateOrderManualRepository} from '@/domain/order/repositories/CreateOrderManualRepository';

export const useCreateOrderManualViewModel = (
	options: MutationOptions,
): CreateOrderManualRepository => {
	const result = useCreateOrderManualUsecase(options);

	return result;
};
