import {MutationOptions} from '@/data/common/types';
import {useUpdateProductUsecase} from '@/data/product/usecases/UpdateMenuProductUsecase';
import {UpdateProductRepository} from '@/domain/product/repositories/UpdateMenuProductRepository';

export const useUpdateProductViewModel = (
	options: MutationOptions,
): UpdateProductRepository => {
	const result = useUpdateProductUsecase(options);

	return result;
};
