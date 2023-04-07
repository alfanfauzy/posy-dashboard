import {MutationOptions} from '@/data/common/types';
import {useUpdateOutletProductUsecase} from '@/data/product/usecases/UpdateOutletProductUsecase';
import {UpdateOutletProductRepository} from '@/domain/product/repositories/UpdateOutletProductRepository';

export const useUpdateOutletProductViewModel = (
	options: MutationOptions,
): UpdateOutletProductRepository => {
	const result = useUpdateOutletProductUsecase(options);

	return result;
};
