import {useDeleteCategoryUsecase} from '@/data/category/usecases/DeleteCategoryUsecase';
import {MutationOptions} from '@/data/common/types';
import {DeleteCategoryRepository} from '@/domain/category/repositories/DeleteCategoryRepository';

export const useDeleteCategoryViewModel = (
	options: MutationOptions,
): DeleteCategoryRepository => {
	const result = useDeleteCategoryUsecase(options);

	return result;
};
