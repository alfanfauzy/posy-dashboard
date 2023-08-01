import {mapToBaseError} from '@/data/common/mappers/ErrorMapper';
import {MutationOptions} from '@/data/common/types';
import {
	CreateCancelOrderInput,
	CreateCancelOrderRepository,
} from '@/domain/order/repositories/CreateCancelOrderRepository';
import {BaseError} from '@/domain/vo/BaseError';
import {enqueueSnackbar} from 'notistack';

import {mapToCreateCancelOrderModel} from '../mappers/OrderMapper';
import {useCreateCancelOrderMutation} from '../sources/CreateCancelOrderMutation';

export const useCreateCancelOrderUsecase = ({
	onSuccess,
	onError,
	...options
}: MutationOptions): CreateCancelOrderRepository => {
	let error: BaseError | null = null;

	const {
		mutate,
		data,
		error: _error,
		...rest
	} = useCreateCancelOrderMutation({
		onSuccess: (dataSuccess, ...args) => {
			if (dataSuccess) {
				onSuccess?.(mapToCreateCancelOrderModel(dataSuccess?.data), ...args);
				enqueueSnackbar({
					message: 'Order Cancelled Successfully',
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

	const createCancelOrder = (input: CreateCancelOrderInput) => {
		mutate(input);
	};

	if (_error) {
		error = mapToBaseError(_error);
	}

	if (data?.data) {
		return {
			createCancelOrder,
			error,
			data: mapToCreateCancelOrderModel(data?.data),
			...rest,
		};
	}

	return {
		createCancelOrder,
		error,
		data: undefined,
		...rest,
	};
};
