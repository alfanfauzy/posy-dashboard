import {MutationOptions} from '@/data/common/types';
import {useCreateProductUsecase} from '@/data/product/usecases/CreateMenuProductUsecase';
import {CreateProductRepository} from '@/domain/product/repositories/CreateMenuProductRepository';

export const useCreateProductViewModel = (
	options: MutationOptions,
): CreateProductRepository => {
	const result = useCreateProductUsecase(options);

	return result;
};
