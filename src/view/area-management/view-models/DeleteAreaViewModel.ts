import {useDeleteAreaUsecase} from '@/data/area/usecases/DeleteAreaUsecase';
import {MutationOptions} from '@/data/common/types';
import {DeleteAreaRepository} from '@/domain/area/repositories/DeleteAreaRepository';

export const useDeleteAreaViewModel = (
	options: MutationOptions,
): DeleteAreaRepository => {
	const result = useDeleteAreaUsecase(options);

	return result;
};
