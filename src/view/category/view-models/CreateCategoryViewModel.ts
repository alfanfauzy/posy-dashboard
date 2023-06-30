import {useCreateCategoryUsecase} from '@/data/category/usecases/CreateCategoryUsecase';
import {MutationOptions} from '@/data/common/types';
import {CreateCategoryRepository} from '@/domain/category/repositories/CreateCategoryRepository';

export const useCreateCategoryViewModel = (
	options: MutationOptions,
): CreateCategoryRepository => {
	const result = useCreateCategoryUsecase(options);

	return result;
};
