import {mapToBaseError} from '@/data/common/mappers/ErrorMapper';
import {MutationOptions} from '@/data/common/types';
import {
	CreateServeOrderInput,
	CreateServeOrderRepository,
} from '@/domain/order/repositories/CreateServeOrderRepository';
import {BaseError} from '@/domain/vo/BaseError';
import {useSnackbar} from 'notistack';

import {mapToCreateServeOrderModel} from '../mappers/OrderMapper';
import {useCreateServeOrderMutation} from '../sources/CreateServeOrderMutation';

export const useCreateServeOrderUsecase = ({
	onError,
	onSuccess,
	...options
}: MutationOptions): CreateServeOrderRepository => {
	let error: BaseError | null = null;
	const {enqueueSnackbar} = useSnackbar();

	const {
		mutate,
		data,
		error: _error,
		...rest
	} = useCreateServeOrderMutation({
		onSuccess: (dataSuccess, vars, ...args) => {
			if (dataSuccess) {
				onSuccess?.(
					mapToCreateServeOrderModel(dataSuccess?.data),
					vars,
					...args,
				);
				if (vars.rollback_to_kitchen) {
					enqueueSnackbar({
						message: 'Rollback to kitchen successfully',
						variant: 'success',
					});
				} else {
					enqueueSnackbar({
						message: 'Order served successfully',
						variant: 'success',
					});
				}
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

	const createServeOrder = (input: CreateServeOrderInput) => {
		mutate(input);
	};

	if (_error) {
		error = mapToBaseError(_error);
	}

	if (data?.data) {
		return {
			createServeOrder,
			data: mapToCreateServeOrderModel(data?.data),
			error,
			...rest,
		};
	}

	return {
		createServeOrder,
		data: undefined,
		error,
		...rest,
	};
};
