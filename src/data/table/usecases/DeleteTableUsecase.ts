import {mapToBaseError} from '@/data/common/mappers/ErrorMapper';
import {MutationOptions} from '@/data/common/types';
import {
	DeleteTableInput,
	DeleteTableRepository,
} from '@/domain/table/repositories/DeleteTableRepository';
import {BaseError} from '@/domain/vo/BaseError';
import {useQueryClient} from '@tanstack/react-query';
import {useSnackbar} from 'notistack';

import {mapToDeleteTableModel} from '../mappers/TableMapper';
import {useDeleteTableMutation} from '../sources/DeleteTableMutation';
import {GetTableLayoutByFloorQueryKey} from '../sources/GetTableLayoutByFloorQuery';

export const useDeleteTableUsecase = ({
	onError,
	onSuccess,
	...options
}: MutationOptions): DeleteTableRepository => {
	let error: BaseError | null = null;
	const queryClient = useQueryClient();
	const {enqueueSnackbar} = useSnackbar();

	const {
		mutate,
		data,
		error: _error,
		...rest
	} = useDeleteTableMutation({
		onSuccess: (dataSuccess, ...args) => {
			if (dataSuccess) {
				onSuccess?.(mapToDeleteTableModel(dataSuccess?.data), ...args);
				enqueueSnackbar({
					message: 'Delete Table Successfully',
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

	const DeleteTable = (input: DeleteTableInput) => {
		mutate(input);
	};

	if (_error) {
		error = mapToBaseError(_error);
	}

	if (data?.data) {
		return {
			DeleteTable,
			data: mapToDeleteTableModel(data?.data),
			error,
			...rest,
		};
	}

	return {
		DeleteTable,
		data: undefined,
		error,
		...rest,
	};
};
