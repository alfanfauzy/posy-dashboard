import {mapToBaseError} from '@/data/common/mappers/ErrorMapper';
import {MutationOptions} from '@/data/common/types';
import {
	CreateProductInput,
	CreateProductRepository,
} from '@/domain/product/repositories/CreateMenuProductRepository';
import {BaseError} from '@/domain/vo/BaseError';
import {enqueueSnackbar} from 'notistack';

import {useCreateProductMutation} from '../sources/CreateMenuProductMutation';

export const useCreateProductUsecase = ({
	onSuccess,
	onError,
	...options
}: MutationOptions): CreateProductRepository => {
	let error: BaseError | null = null;

	const {
		mutate,
		data,
		error: _error,
		...rest
	} = useCreateProductMutation({
		onSuccess: (dataSuccess, ...args) => {
			if (dataSuccess) {
				onSuccess?.(dataSuccess?.data, ...args);
				enqueueSnackbar({
					message: 'Successfully add product',
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

	const createProduct = (input: CreateProductInput) => {
		mutate(input);
	};

	if (_error) {
		error = mapToBaseError(_error);
	}

	if (data?.data) {
		return {
			createProduct,
			error,
			data: null,
			...rest,
		};
	}

	return {
		createProduct,
		error,
		data: undefined,
		...rest,
	};
};
