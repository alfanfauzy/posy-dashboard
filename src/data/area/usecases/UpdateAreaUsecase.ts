import {mapToBaseError} from '@/data/common/mappers/ErrorMapper';
import {MutationOptions} from '@/data/common/types';
import {
	UpdateAreaInput,
	UpdateAreaRepository,
} from '@/domain/area/repositories/UpdateAreaRepository';
import {BaseError} from '@/domain/vo/BaseError';
import {useQueryClient} from '@tanstack/react-query';
import {useSnackbar} from 'notistack';

import {mapToUpdateAreaModel} from '../mappers/AreaMapper';
import {GetAreaQueryKey} from '../sources/GetAreaQuery';
import {GetAreasQueryKey} from '../sources/GetAreasQuery';
import {useUpdateAreaMutation} from '../sources/UpdateAreaMutation';

export const useUpdateAreaUsecase = ({
	onError,
	onSuccess,
	...options
}: MutationOptions): UpdateAreaRepository => {
	let error: BaseError | null = null;
	const queryClient = useQueryClient();
	const {enqueueSnackbar} = useSnackbar();

	const {
		mutate,
		data,
		error: _error,
		...rest
	} = useUpdateAreaMutation({
		onSuccess: (dataSuccess, ...args) => {
			if (dataSuccess) {
				onSuccess?.(mapToUpdateAreaModel(dataSuccess?.data), ...args);
				enqueueSnackbar({
					message: 'Update Area Successfully',
					variant: 'success',
				});
				queryClient.invalidateQueries([GetAreasQueryKey]);
				queryClient.invalidateQueries([GetAreaQueryKey]);
			}
		},
		onError: (dataError, ...args) => {
			if (dataError) {
				const err = mapToBaseError(dataError);
				onError?.(err, ...args);
				enqueueSnackbar({
					message: err.message,
					variant: 'error',
				});
			}
		},
		...options,
	});

	const UpdateArea = (input: UpdateAreaInput) => {
		mutate(input);
	};

	if (_error) {
		error = mapToBaseError(_error);
	}

	if (data?.data) {
		return {
			UpdateArea,
			data: mapToUpdateAreaModel(data?.data),
			error,
			...rest,
		};
	}

	return {
		UpdateArea,
		data: undefined,
		error,
		...rest,
	};
};
