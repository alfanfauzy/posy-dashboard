import {MutationOptions} from '@/data/common/types';
import {useUpdateGeneralSettingsUsecase} from '@/data/outlet/usecases/UpdateGeneralSettingsUsecase';
import {UpdateGeneralSettingsRepository} from '@/domain/outlet/repositories/UpdateGeneralSettingsRepository';

export const useUpdateGeneralSettingsViewModel = (
	options: MutationOptions,
): UpdateGeneralSettingsRepository => {
	const result = useUpdateGeneralSettingsUsecase(options);

	return result;
};
