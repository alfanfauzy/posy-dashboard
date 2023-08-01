import {mapToBaseError} from '@/data/common/mappers/ErrorMapper';
import {MutationOptions} from '@/data/common/types';
import {
	DeleteAreaInput,
	DeleteAreaRepository,
} from '@/domain/area/repositories/DeleteAreaRepository';
import {BaseError} from '@/domain/vo/BaseError';
import {useQueryClient} from '@tanstack/react-query';
import {useSnackbar} from 'notistack';

import {mapToDeleteAreaModel} from '../mappers/AreaMapper';
import {useDeleteAreaMutation} from '../sources/DeleteAreaMutation';
import {GetAreasQueryKey} from '../sources/GetAreasQuery';

export const useDeleteAreaUsecase = ({
	onError,
	onSuccess,
	...options
}: MutationOptions): DeleteAreaRepository => {
	let error: BaseError | null = null;
	const queryClient = useQueryClient();
	const {enqueueSnackbar} = useSnackbar();

	const {
		mutate,
		data,
		error: _error,
		...rest
	} = useDeleteAreaMutation({
		onSuccess: (dataSuccess, ...args) => {
			if (dataSuccess) {
				onSuccess?.(mapToDeleteAreaModel(dataSuccess?.data), ...args);
				enqueueSnackbar({
					message: 'Delete Area Successfully',
					variant: 'success',
				});
				queryClient.invalidateQueries([GetAreasQueryKey]);
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

	const DeleteArea = (input: DeleteAreaInput) => {
		mutate(input);
	};

	if (_error) {
		error = mapToBaseError(_error);
	}

	if (data?.data) {
		return {
			DeleteArea,
			data: mapToDeleteAreaModel(data?.data),
			error,
			...rest,
		};
	}

	return {
		DeleteArea,
		data: undefined,
		error,
		...rest,
	};
};
