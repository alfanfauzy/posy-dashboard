import {mapToBaseError} from '@/data/common/mappers/ErrorMapper';
import {MutationOptions} from '@/data/common/types';
import {
	UpdateProductInput,
	UpdateProductRepository,
} from '@/domain/product/repositories/UpdateMenuProductRepository';
import {BaseError} from '@/domain/vo/BaseError';
import {enqueueSnackbar} from 'notistack';

import {useUpdateProductMutation} from '../sources/UpdateMenuProductMutation';

export const useUpdateProductUsecase = ({
	onSuccess,
	onError,
	...options
}: MutationOptions): UpdateProductRepository => {
	let error: BaseError | null = null;

	const {
		mutate,
		data,
		error: _error,
		...rest
	} = useUpdateProductMutation({
		onSuccess: (dataSuccess, ...args) => {
			if (dataSuccess) {
				onSuccess?.(dataSuccess?.data, ...args);
				enqueueSnackbar({
					message: 'Successfully update product',
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

	const updateProduct = (input: UpdateProductInput) => {
		mutate(input);
	};

	if (_error) {
		error = mapToBaseError(_error);
	}

	if (data?.data) {
		return {
			updateProduct,
			error,
			data: null,
			...rest,
		};
	}

	return {
		updateProduct,
		error,
		data: undefined,
		...rest,
	};
};
