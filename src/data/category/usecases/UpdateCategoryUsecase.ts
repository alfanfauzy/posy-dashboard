import {mapToBaseError} from '@/data/common/mappers/ErrorMapper';
import {MutationOptions} from '@/data/common/types';
import {
	UpdateCategoryInput,
	UpdateCategoryRepository,
} from '@/domain/category/repositories/UpdateCategoryRepository';
import {BaseError} from '@/domain/vo/BaseError';
import {enqueueSnackbar} from 'notistack';

import {useUpdateCategoryMutation} from '../sources/UpdateCategoryMutation';

export const useUpdateCategoryUsecase = ({
	onSuccess,
	onError,
	...options
}: MutationOptions): UpdateCategoryRepository => {
	let error: BaseError | null = null;

	const {
		mutate,
		data,
		error: _error,
		...rest
	} = useUpdateCategoryMutation({
		onSuccess: (dataSuccess, ...args) => {
			if (dataSuccess) {
				onSuccess?.(dataSuccess?.data, ...args);
				enqueueSnackbar({
					message: 'Update Successfully',
					variant: 'success',
				});
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

	const updateCategory = (input: UpdateCategoryInput) => {
		mutate(input);
	};

	if (_error) {
		error = mapToBaseError(_error);
	}

	if (data?.data) {
		return {
			updateCategory,
			error,
			data: null,
			...rest,
		};
	}

	return {
		updateCategory,
		error,
		data: undefined,
		...rest,
	};
};
