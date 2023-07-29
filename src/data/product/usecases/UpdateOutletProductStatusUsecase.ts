import {mapToBaseError} from '@/data/common/mappers/ErrorMapper';
import {MutationOptions} from '@/data/common/types';
import {
	UpdateOutletProductStatusInput,
	UpdateOutletProductStatusRepository,
} from '@/domain/product/repositories/UpdateOutletProductStatusRepository';
import {BaseError} from '@/domain/vo/BaseError';
import {useSnackbar} from 'notistack';

import {mapToUpdateOutletProductStatusModel} from '../mappers/ProductMapper';
import {useUpdateOutletProductStatusMutation} from '../sources/UpdateOutletProductStatusMutation';

export const useUpdateOutletProductStatusUsecase = ({
	onSuccess,
	onError,
	...options
}: MutationOptions): UpdateOutletProductStatusRepository => {
	let error: BaseError | null = null;
	const {enqueueSnackbar} = useSnackbar();

	const {
		mutate,
		data,
		error: _error,
		...rest
	} = useUpdateOutletProductStatusMutation({
		onSuccess: (dataSuccess, ...args) => {
			if (dataSuccess) {
				onSuccess?.(
					mapToUpdateOutletProductStatusModel(dataSuccess?.data),
					...args,
				);
				enqueueSnackbar({
					message: 'Product Status Updated Successfully',
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

	const updateOutletProductStatus = (input: UpdateOutletProductStatusInput) => {
		mutate(input);
	};

	if (_error) {
		error = mapToBaseError(_error);
	}

	if (data?.data) {
		return {
			updateOutletProductStatus,
			data: mapToUpdateOutletProductStatusModel(data?.data),
			error,
			...rest,
		};
	}

	return {
		updateOutletProductStatus,
		data: undefined,
		error,
		...rest,
	};
};
