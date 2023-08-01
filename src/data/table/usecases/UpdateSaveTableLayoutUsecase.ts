import {mapToBaseError} from '@/data/common/mappers/ErrorMapper';
import {MutationOptions} from '@/data/common/types';
import {
	UpdateSaveTableLayoutInput,
	UpdateSaveTableLayoutRepository,
} from '@/domain/table/repositories/UpdateSaveTableLayoutRepository';
import {BaseError} from '@/domain/vo/BaseError';
import {useQueryClient} from '@tanstack/react-query';
import {useSnackbar} from 'notistack';

import {mapToUpdateTableByFloorModel} from '../mappers/TableMapper';
import {GetTableLayoutByFloorQueryKey} from '../sources/GetTableLayoutByFloorQuery';
import {useUpdateSaveTableLayoutMutation} from '../sources/UpdateSaveTableLayoutMutation';

export const useUpdateSaveTableLayoutUsecase = ({
	onError,
	onSuccess,
	...options
}: MutationOptions): UpdateSaveTableLayoutRepository => {
	let error: BaseError | null = null;
	const queryClient = useQueryClient();
	const {enqueueSnackbar} = useSnackbar();

	const {
		mutate,
		data,
		error: _error,
		...rest
	} = useUpdateSaveTableLayoutMutation({
		onSuccess: (dataSuccess, ...args) => {
			if (dataSuccess) {
				onSuccess?.(mapToUpdateTableByFloorModel(dataSuccess?.data), ...args);
				enqueueSnackbar({
					message: 'Update Table Layout Successfully',
					variant: 'success',
				});
				queryClient.invalidateQueries([GetTableLayoutByFloorQueryKey]);
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

	const UpdateSaveTableLayout = (input: UpdateSaveTableLayoutInput) => {
		mutate(input);
	};

	if (_error) {
		error = mapToBaseError(_error);
	}

	if (data?.data) {
		return {
			UpdateSaveTableLayout,
			data: mapToUpdateTableByFloorModel(data?.data),
			error,
			...rest,
		};
	}

	return {
		UpdateSaveTableLayout,
		data: undefined,
		error,
		...rest,
	};
};
