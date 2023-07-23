import {mapToBaseError} from '@/data/common/mappers/ErrorMapper';
import {MutationOptions} from '@/data/common/types';
import {
	CategoryId,
	DeleteCategoryRepository,
} from '@/domain/category/repositories/DeleteCategoryRepository';
import {BaseError} from '@/domain/vo/BaseError';
import {enqueueSnackbar} from 'notistack';

import {useDeleteCategoryMutation} from '../sources/DeleteCategoryMutation';

export const useDeleteCategoryUsecase = ({
	onSuccess,
	onError,
	...options
}: MutationOptions): DeleteCategoryRepository => {
	let error: BaseError | null = null;

	const {
		mutate,
		data,
		error: _error,
		...rest
	} = useDeleteCategoryMutation({
		onSuccess: (dataSuccess, ...args) => {
			if (dataSuccess) {
				onSuccess?.(dataSuccess?.data, ...args);
				enqueueSnackbar({
					message: 'Successfully Delete',
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

	const deleteCategory = (input: CategoryId) => {
		mutate(input);
	};

	if (_error) {
		error = mapToBaseError(_error);
	}

	if (data?.data) {
		return {
			deleteCategory,
			error,
			data: null,
			...rest,
		};
	}

	return {
		deleteCategory,
		error,
		data: undefined,
		...rest,
	};
};
