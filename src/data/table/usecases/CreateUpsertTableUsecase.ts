import {mapToBaseError} from '@/data/common/mappers/ErrorMapper';
import {MutationOptions} from '@/data/common/types';
import {
	CreateUpsertTableInput,
	CreateUpsertTableRepository,
} from '@/domain/table/repositories/CreateUpsertTableRepository';
import {BaseError} from '@/domain/vo/BaseError';
import {useQueryClient} from '@tanstack/react-query';
import {useSnackbar} from 'notistack';

import {mapToCreateUpsertTableModel} from '../mappers/TableMapper';
import {useCreateUpsertTableMutation} from '../sources/CreateUpsertTableMutation';
import {GetTableLayoutByFloorQueryKey} from '../sources/GetTableLayoutByFloorQuery';

export const useCreateUpsertTableUsecase = ({
	onError,
	onSuccess,
	...options
}: MutationOptions): CreateUpsertTableRepository => {
	let error: BaseError | null = null;
	const queryClient = useQueryClient();
	const {enqueueSnackbar} = useSnackbar();

	const {
		mutate,
		data,
		error: _error,
		...rest
	} = useCreateUpsertTableMutation({
		onSuccess: (dataSuccess, ...args) => {
			if (dataSuccess) {
				onSuccess?.(mapToCreateUpsertTableModel(dataSuccess?.data), ...args);
				enqueueSnackbar({
					message: 'Update Table Successfully',
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

	const CreateUpsertTable = (input: CreateUpsertTableInput) => {
		mutate(input);
	};

	if (_error) {
		error = mapToBaseError(_error);
	}

	if (data?.data) {
		return {
			CreateUpsertTable,
			data: mapToCreateUpsertTableModel(data?.data),
			error,
			...rest,
		};
	}

	return {
		CreateUpsertTable,
		data: undefined,
		error,
		...rest,
	};
};
