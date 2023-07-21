import {mapToBaseError} from '@/data/common/mappers/ErrorMapper';
import {MutationOptions} from '@/data/common/types';
import {
	UpdateBulkTableByFloorInput,
	UpdateBulkTableByFloorRepository,
} from '@/domain/table/repositories/UpdateBulkTableByFloorRepository';
import {BaseError} from '@/domain/vo/BaseError';
import {useSnackbar} from 'notistack';

import {mapToUpdateTableByFloorModel} from '../mappers/TableMapper';
import {useUpdateBulkTableByFloorMutation} from '../sources/UpdateBulkTableByFloorMutation';

export const useUpdateBulkTableByFloorUsecase = ({
	onError,
	onSuccess,
	...options
}: MutationOptions): UpdateBulkTableByFloorRepository => {
	let error: BaseError | null = null;
	const {enqueueSnackbar} = useSnackbar();

	const {
		mutate,
		data,
		error: _error,
		...rest
	} = useUpdateBulkTableByFloorMutation({
		onSuccess: (dataSuccess, ...args) => {
			if (dataSuccess) {
				onSuccess?.(mapToUpdateTableByFloorModel(dataSuccess?.data), ...args);
				enqueueSnackbar({
					message: 'Update Table Successfully',
					variant: 'success',
				});
			}
		},
		onError: (dataError, ...args) => {
			if (dataError) {
				const err = mapToBaseError(dataError);
				onError?.(err, ...args);
				enqueueSnackbar({
					message: err.message?.split('_')?.join(' '),
					variant: 'error',
				});
			}
		},
		...options,
	});

	const UpdateBulkTableByFloor = (input: UpdateBulkTableByFloorInput) => {
		mutate(input);
	};

	if (_error) {
		error = mapToBaseError(_error);
	}

	if (data?.data) {
		return {
			UpdateBulkTableByFloor,
			data: mapToUpdateTableByFloorModel(data?.data),
			error,
			...rest,
		};
	}

	return {
		UpdateBulkTableByFloor,
		data: undefined,
		error,
		...rest,
	};
};
