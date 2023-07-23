import {useUpdateCategoryUsecase} from '@/data/category/usecases/UpdateCategoryUsecase';
import {MutationOptions} from '@/data/common/types';
import {UpdateCategoryRepository} from '@/domain/category/repositories/UpdateCategoryRepository';

export const useUpdateCategoryViewModel = (
	options: MutationOptions,
): UpdateCategoryRepository => {
	const result = useUpdateCategoryUsecase(options);

	return result;
};
