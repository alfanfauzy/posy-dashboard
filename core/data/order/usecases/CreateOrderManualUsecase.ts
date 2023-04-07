import {mapToBaseError} from '@/data/common/mappers/ErrorMapper';
import {MutationOptions} from '@/data/common/types';
import {
	CreateOrderManualInput,
	CreateOrderManualRepository,
} from '@/domain/order/repositories/CreateOrderManualRepository';
import {BaseError} from '@/domain/vo/BaseError';
import {useSnackbar} from 'notistack';

import {mapToCreateOrderManualModel} from '../mappers/OrderMapper';
import {useCreateOrderManualMutation} from '../sources/CreateOrderManualMutation';

export const useCreateOrderManualUsecase = ({
	onSuccess,
	onError,
	...options
}: MutationOptions): CreateOrderManualRepository => {
	let error: BaseError | null = null;
	const {enqueueSnackbar} = useSnackbar();

	const {
		mutate,
		data,
		error: _error,
		...rest
	} = useCreateOrderManualMutation({
		onSuccess: (dataSuccess, ...args) => {
			if (dataSuccess) {
				onSuccess?.(mapToCreateOrderManualModel(dataSuccess?.data), ...args);
				enqueueSnackbar({
					message: 'Order Created Successfully',
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

	const createOrderManual = (input: CreateOrderManualInput) => {
		mutate(input);
	};

	if (_error) {
		error = mapToBaseError(_error);
	}

	if (data?.data) {
		return {
			createOrderManual,
			data: mapToCreateOrderManualModel(data?.data),
			error,
			...rest,
		};
	}

	return {
		createOrderManual,
		data: undefined,
		error,
		...rest,
	};
};
