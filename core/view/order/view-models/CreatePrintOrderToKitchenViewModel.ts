import {MutationOptions} from '@/data/common/types';
import {CreatePrintOrderToKitchenDataResponse} from '@/data/order/types';
import {useCreatePrintOrderToKitchenUsecase} from '@/data/order/usecases/CreatePrintOrderToKitchenUsecase';
import {CreatePrintOrderToKitchenRepository} from '@/domain/order/repositories/CreatePrintOrderToKitchenRepository';

export const useCreatePrintOrderToKitchenViewModel = (
	options?: MutationOptions<CreatePrintOrderToKitchenDataResponse>,
): CreatePrintOrderToKitchenRepository => {
	const result = useCreatePrintOrderToKitchenUsecase(options);

	return result;
};
