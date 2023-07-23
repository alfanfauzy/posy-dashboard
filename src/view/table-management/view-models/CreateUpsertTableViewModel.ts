import {MutationOptions} from '@/data/common/types';
import {useCreateUpsertTableUsecase} from '@/data/table/usecases/CreateUpsertTableUsecase';
import {CreateUpsertTableRepository} from '@/domain/table/repositories/CreateUpsertTableRepository';

export const useCreateUpsertTableViewModel = (
	options: MutationOptions,
): CreateUpsertTableRepository => {
	const result = useCreateUpsertTableUsecase(options);

	return result;
};
