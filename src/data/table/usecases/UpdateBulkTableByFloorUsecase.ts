import {GetAreaQueryKey} from '@/data/area/sources/GetAreaQuery';
import {mapToBaseError} from '@/data/common/mappers/ErrorMapper';
import {MutationOptions} from '@/data/common/types';
import {
	UpdateBulkTableByFloorInput,
	UpdateBulkTableByFloorRepository,
} from '@/domain/table/repositories/UpdateBulkTableByFloorRepository';
import {BaseError} from '@/domain/vo/BaseError';
import {useQueryClient} from '@tanstack/react-query';
import {useSnackbar} from 'notistack';

import {mapToUpdateTableByFloorModel} from '../mappers/TableMapper';
import {useUpdateBulkTableByFloorMutation} from '../sources/UpdateBulkTableByFloorMutation';

export const useUpdateBulkTableByFloorUsecase = ({
	onError,
	onSuccess,
	...options
}: MutationOptions): UpdateBulkTableByFloorRepository => {
	const queryClient = useQueryClient();
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
				queryClient.invalidateQueries([GetAreaQueryKey]);
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
