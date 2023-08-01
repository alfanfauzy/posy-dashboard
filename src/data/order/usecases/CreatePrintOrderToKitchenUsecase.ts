import {mapToBaseError} from '@/data/common/mappers/ErrorMapper';
import {MutationOptions} from '@/data/common/types';
import {
	CreatePrintOrderToKitchenInput,
	CreatePrintOrderToKitchenRepository,
} from '@/domain/order/repositories/CreatePrintOrderToKitchenRepository';
import {BaseError} from '@/domain/vo/BaseError';

import {mapToCreatePrintOrderToKitchenModel} from '../mappers/OrderMapper';
import {useCreatePrintOrderToKitchenMutation} from '../sources/CreatePrintOrderToKitchenMutation';

export const useCreatePrintOrderToKitchenUsecase = ({
	onSuccess,
	onError,
	...options
}: MutationOptions): CreatePrintOrderToKitchenRepository => {
	let error: BaseError | null = null;

	const {
		mutate,
		data,
		error: _error,
		...rest
	} = useCreatePrintOrderToKitchenMutation({
		onSuccess: (dataSuccess, ...args) => {
			if (dataSuccess) {
				onSuccess?.(
					mapToCreatePrintOrderToKitchenModel(dataSuccess?.data),
					...args,
				);
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

	const createPrintOrderToKitchen = (input: CreatePrintOrderToKitchenInput) => {
		mutate(input);
	};

	if (_error) {
		error = mapToBaseError(_error);
	}

	if (data?.data) {
		return {
			createPrintOrderToKitchen,
			data: mapToCreatePrintOrderToKitchenModel(data?.data),
			error,
			...rest,
		};
	}

	return {
		createPrintOrderToKitchen,
		data: undefined,
		error,
		...rest,
	};
};
