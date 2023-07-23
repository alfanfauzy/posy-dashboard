import {mapToBaseError} from '@/data/common/mappers/ErrorMapper';
import {MutationOptions} from '@/data/common/types';
import {
	CreateAreaInput,
	CreateAreaRepository,
} from '@/domain/area/repositories/CreateAreaRepository';
import {BaseError} from '@/domain/vo/BaseError';
import {useQueryClient} from '@tanstack/react-query';
import {useSnackbar} from 'notistack';

import {mapToCreateAreaModel} from '../mappers/AreaMapper';
import {useCreateAreaMutation} from '../sources/CreateAreaMutation';
import {GetAreasQueryKey} from '../sources/GetAreasQuery';

export const useCreateAreaUsecase = ({
	onError,
	onSuccess,
	...options
}: MutationOptions): CreateAreaRepository => {
	let error: BaseError | null = null;
	const queryClient = useQueryClient();
	const {enqueueSnackbar} = useSnackbar();

	const {
		mutate,
		data,
		error: _error,
		...rest
	} = useCreateAreaMutation({
		onSuccess: (dataSuccess, ...args) => {
			if (dataSuccess) {
				onSuccess?.(mapToCreateAreaModel(dataSuccess?.data), ...args);
				enqueueSnackbar({
					message: 'Create Area Successfully',
					variant: 'success',
				});
				queryClient.invalidateQueries([GetAreasQueryKey]);
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

	const createArea = (input: CreateAreaInput) => {
		mutate(input);
	};

	if (_error) {
		error = mapToBaseError(_error);
	}

	if (data?.data) {
		return {
			createArea,
			data: mapToCreateAreaModel(data?.data),
			error,
			...rest,
		};
	}

	return {
		createArea,
		data: undefined,
		error,
		...rest,
	};
};
