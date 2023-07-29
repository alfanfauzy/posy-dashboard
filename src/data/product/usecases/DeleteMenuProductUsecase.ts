import {mapToBaseError} from '@/data/common/mappers/ErrorMapper';
import {MutationOptions} from '@/data/common/types';
import {DeleteProductRepository} from '@/domain/product/repositories/DeleteMenuProductRepository';
import {BaseError} from '@/domain/vo/BaseError';
import {enqueueSnackbar} from 'notistack';

import {useDeleteProductMutation} from '../sources/DeleteMenuProductMutation';

export const useDeleteProductUsecase = ({
	onSuccess,
	onError,
	...options
}: MutationOptions): DeleteProductRepository => {
	let error: BaseError | null = null;

	const {
		mutate,
		data,
		error: _error,
		...rest
	} = useDeleteProductMutation({
		onSuccess: (dataSuccess, ...args) => {
			if (dataSuccess) {
				onSuccess?.(dataSuccess?.data, ...args);
				enqueueSnackbar({
					message: 'Successfully delete product',
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

	const deleteProduct = (input: string) => {
		mutate(input);
	};

	if (_error) {
		error = mapToBaseError(_error);
	}

	if (data?.data) {
		return {
			deleteProduct,
			error,
			data: null,
			...rest,
		};
	}

	return {
		deleteProduct,
		error,
		data: undefined,
		...rest,
	};
};
