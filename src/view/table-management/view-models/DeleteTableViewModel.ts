import {MutationOptions} from '@/data/common/types';
import {useDeleteTableUsecase} from '@/data/table/usecases/DeleteTableUsecase';
import {DeleteTableRepository} from '@/domain/table/repositories/DeleteTableRepository';

export const useDeleteTableViewModel = (
	options: MutationOptions,
): DeleteTableRepository => {
	const result = useDeleteTableUsecase(options);

	return result;
};
