import {mapToBaseError} from '@/data/common/mappers/ErrorMapper';
import {MutationOptions} from '@/data/common/types';
import {
	UpdateOutletProductDefaultInput,
	UpdateOutletProductRepository,
} from '@/domain/product/repositories/UpdateOutletProductRepository';
import {BaseError} from '@/domain/vo/BaseError';
import {ValidationSchemaProductOutletType} from '@/view/product/schemas/update-product';
import {useSnackbar} from 'notistack';

import {
	mapToUpdateOutletProductModel,
	mapToUpdateOutletProductPayload,
} from '../mappers/ProductMapper';
import {useUpdateOutletProductMutation} from '../sources/UpdateOutletProductMutation';

export const useUpdateOutletProductUsecase = ({
	onError,
	onSuccess,
	...options
}: MutationOptions): UpdateOutletProductRepository => {
	let error: BaseError | null = null;
	const {enqueueSnackbar} = useSnackbar();

	const {
		mutate,
		data,
		error: _error,
		...rest
	} = useUpdateOutletProductMutation({
		onSuccess: (dataSuccess, ...args) => {
			if (dataSuccess) {
				onSuccess?.(mapToUpdateOutletProductModel(dataSuccess?.data), ...args);
				enqueueSnackbar({
					message: 'Product Updated Successfully',
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

	const updateOutletProduct = (
		input: ValidationSchemaProductOutletType,
		default_input: UpdateOutletProductDefaultInput,
	) => {
		const mappedPayload = mapToUpdateOutletProductPayload(input, default_input);
		mutate(mappedPayload);
	};

	if (_error) {
		error = mapToBaseError(_error);
	}

	if (data?.data) {
		return {
			updateOutletProduct,
			data: mapToUpdateOutletProductModel(data?.data),
			error,
			...rest,
		};
	}

	return {
		updateOutletProduct,
		data: undefined,
		error,
		...rest,
	};
};
