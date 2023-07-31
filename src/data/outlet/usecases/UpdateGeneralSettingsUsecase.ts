import {mapToBaseError} from '@/data/common/mappers/ErrorMapper';
import {MutationOptions} from '@/data/common/types';
import {
	UpdateGeneralSettingsInput,
	UpdateGeneralSettingsRepository,
} from '@/domain/outlet/repositories/UpdateGeneralSettingsRepository';
import {BaseError} from '@/domain/vo/BaseError';
import {useSnackbar} from 'notistack';

import {mapToUpdateGeneralSettingsModel} from '../mappers/GeneralSettingsMapper';
import {useUpdateGeneralSettingsMutation} from '../sources/UpdateGeneralSettingsMutation';

export const useUpdateGeneralSettingsUsecase = ({
	onError,
	onSuccess,
	...options
}: MutationOptions): UpdateGeneralSettingsRepository => {
	let error: BaseError | null = null;
	const {enqueueSnackbar} = useSnackbar();

	const {
		mutate,
		data,
		error: _error,
		...rest
	} = useUpdateGeneralSettingsMutation({
		onSuccess: (dataSuccess, vars, ...args) => {
			if (dataSuccess) {
				onSuccess?.(
					mapToUpdateGeneralSettingsModel(dataSuccess?.data),
					vars,
					...args,
				);
				enqueueSnackbar({
					message: 'Update general settings successfully',
					variant: 'success',
				});
			}
		},
		onError: (dataError, ...args) => {
			if (dataError) {
				const err = mapToBaseError(dataError);
				onError?.(err, ...args);
			}
		},
		...options,
	});

	const UpdateGeneralSettings = (input: UpdateGeneralSettingsInput) => {
		mutate(input);
	};

	if (_error) {
		error = mapToBaseError(_error);
	}

	if (data?.data) {
		return {
			UpdateGeneralSettings,
			data: mapToUpdateGeneralSettingsModel(data?.data),
			error,
			...rest,
		};
	}

	return {
		UpdateGeneralSettings,
		data: undefined,
		error,
		...rest,
	};
};
