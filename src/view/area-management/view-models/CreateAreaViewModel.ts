import {useCreateAreaUsecase} from '@/data/area/usecases/CreateAreaUsecase';
import {MutationOptions} from '@/data/common/types';
import {CreateAreaRepository} from '@/domain/area/repositories/CreateAreaRepository';

export const useCreateAreaViewModel = (
	options: MutationOptions,
): CreateAreaRepository => {
	const result = useCreateAreaUsecase(options);

	return result;
};
