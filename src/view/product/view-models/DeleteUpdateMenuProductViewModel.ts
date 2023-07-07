import {MutationOptions} from '@/data/common/types';
import {useDeleteProductUsecase} from '@/data/product/usecases/DeleteMenuProductUsecase';
import {DeleteProductRepository} from '@/domain/product/repositories/DeleteMenuProductRepository';

export const useDeleteProductViewModel = (
	options: MutationOptions,
): DeleteProductRepository => {
	const result = useDeleteProductUsecase(options);

	return result;
};
