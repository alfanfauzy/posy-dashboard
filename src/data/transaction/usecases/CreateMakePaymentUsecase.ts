import {mapToBaseError} from '@/data/common/mappers/ErrorMapper';
import {MutationOptions} from '@/data/common/types';
import {
	CreateMakePaymentInput,
	CreateMakePaymentRepository,
} from '@/domain/transaction/repositories/CreateMakePaymentRepository';
import {BaseError} from '@/domain/vo/BaseError';
import {useSnackbar} from 'notistack';

import {mapToMakePaymentModel} from '../mappers/TransactionMapper';
import {useCreateMakePaymentMutation} from '../sources/CreateMakePaymentMutation';

export const useCreateMakePaymentUsecase = ({
	onSuccess,
	onError,
	...options
}: MutationOptions): CreateMakePaymentRepository => {
	let error: BaseError | null = null;
	const {enqueueSnackbar} = useSnackbar();

	const {
		mutate,
		data,
		error: _error,
		...rest
	} = useCreateMakePaymentMutation({
		onSuccess: (dataSuccess, ...args) => {
			if (dataSuccess) {
				onSuccess?.(mapToMakePaymentModel(dataSuccess.data), ...args);
				enqueueSnackbar({
					message: 'Payment Made Successfully',
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

	const makePayment = (input: CreateMakePaymentInput) => {
		mutate(input);
	};

	if (_error) {
		error = mapToBaseError(_error);
	}

	if (data?.data) {
		return {
			makePayment,
			data: mapToMakePaymentModel(data?.data),
			error,
			...rest,
		};
	}

	return {
		makePayment,
		data: undefined,
		error,
		...rest,
	};
};
