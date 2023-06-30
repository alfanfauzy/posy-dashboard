import {mapToBaseError} from '@/data/common/mappers/ErrorMapper';
import {MutationOptions} from '@/data/common/types';
import {
	CreateCategoryInput,
	CreateCategoryRepository,
} from '@/domain/category/repositories/CreateCategoryRepository';
import {BaseError} from '@/domain/vo/BaseError';
import {enqueueSnackbar} from 'notistack';

import {useCreateCategoryMutation} from '../sources/CreateCategoryMutation';

export const useCreateCategoryUsecase = ({
	onSuccess,
	onError,
	...options
}: MutationOptions): CreateCategoryRepository => {
	let error: BaseError | null = null;

	const {
		mutate,
		data,
		error: _error,
		...rest
	} = useCreateCategoryMutation({
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

	const createCategory = (input: CreateCategoryInput) => {
		mutate(input);
	};

	if (_error) {
		error = mapToBaseError(_error);
	}

	if (data?.data) {
		return {
			createCategory,
			error,
			data: null,
			...rest,
		};
	}

	return {
		createCategory,
		error,
		data: undefined,
		...rest,
	};
};
