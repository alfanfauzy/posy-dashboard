import {mapToBaseError} from '@/data/common/mappers/ErrorMapper';
import {MutationOptions} from '@/data/common/types';
import {
	UpdateTaxInput,
	UpdateTaxRepository,
} from '@/domain/tax/repositories/TaxRepository';
import {BaseError} from '@/domain/vo/BaseError';
import {useSnackbar} from 'notistack';

import {mapToUpdateTaxModel} from '../mappers/TaxMapper';
import {useUpdateTaxMutation} from '../sources/UpdateTaxMutation';

export const useUpdateTaxUsecase = ({
	onError,
	onSuccess,
	...options
}: MutationOptions): UpdateTaxRepository => {
	let error: BaseError | null = null;
	const {enqueueSnackbar} = useSnackbar();

	const {
		mutate,
		data,
		error: _error,
		...rest
	} = useUpdateTaxMutation({
		onSuccess: (dataSuccess, ...args) => {
			onSuccess?.(mapToUpdateTaxModel(dataSuccess.data), ...args);
			if (dataSuccess) {
				enqueueSnackbar({
					message: 'Tax Updated Successfully',
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

	const updateTax = (input: UpdateTaxInput) => {
		mutate(input);
	};

	if (_error) {
		error = mapToBaseError(_error);
	}

	if (data?.data) {
		return {
			updateTax,
			data: mapToUpdateTaxModel(data?.data),
			error,
			...rest,
		};
	}

	return {
		updateTax,
		data: undefined,
		error,
		...rest,
	};
};
