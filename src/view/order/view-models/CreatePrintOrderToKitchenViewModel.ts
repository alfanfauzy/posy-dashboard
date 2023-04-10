import {MutationOptions} from '@/data/common/types';
import {useCreatePrintOrderToKitchenUsecase} from '@/data/order/usecases/CreatePrintOrderToKitchenUsecase';
import {CreatePrintOrderToKitchenRepository} from '@/domain/order/repositories/CreatePrintOrderToKitchenRepository';

export const useCreatePrintOrderToKitchenViewModel = (
	options: MutationOptions,
): CreatePrintOrderToKitchenRepository => {
	const result = useCreatePrintOrderToKitchenUsecase(options);

	return result;
};
