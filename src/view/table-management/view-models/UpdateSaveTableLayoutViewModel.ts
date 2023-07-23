import {MutationOptions} from '@/data/common/types';
import {useUpdateSaveTableLayoutUsecase} from '@/data/table/usecases/UpdateSaveTableLayoutUsecase';
import {UpdateSaveTableLayoutRepository} from '@/domain/table/repositories/UpdateSaveTableLayoutRepository';

export const useUpdateSaveTableLayoutViewModel = (
	options: MutationOptions,
): UpdateSaveTableLayoutRepository => {
	const result = useUpdateSaveTableLayoutUsecase(options);

	return result;
};
