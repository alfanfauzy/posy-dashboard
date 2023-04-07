import {mapToBaseError} from '@/data/common/mappers/ErrorMapper';
import {MutationOptions} from '@/data/common/types';
import {
	UpdateTransactionInput,
	UpdateTransactionRepository,
} from '@/domain/transaction/repositories/UpdateTransactionRepository';
import {BaseError} from '@/domain/vo/BaseError';
import {useSnackbar} from 'notistack';

import {mapToUpdateTransactionModel} from '../mappers/TransactionMapper';
import {useUpdateTransactionMutation} from '../sources/UpdateTransactionMutation';

export const useUpdateTransactionUsecase = ({
	onSuccess,
	onError,
	...options
}: MutationOptions): UpdateTransactionRepository => {
	let error: BaseError | null = null;
	const {enqueueSnackbar} = useSnackbar();

	const {
		mutate,
		data,
		error: _error,
		...rest
	} = useUpdateTransactionMutation({
		onSuccess: (dataSuccess, ...args) => {
			if (dataSuccess) {
				onSuccess?.(mapToUpdateTransactionModel(dataSuccess.data), ...args);
				enqueueSnackbar({
					message: 'Transaction Updated Successfully',
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

	const updateTransaction = (input: UpdateTransactionInput) => {
		mutate(input);
	};

	if (_error) {
		error = mapToBaseError(_error);
	}

	if (data?.data) {
		return {
			updateTransaction,
			data: mapToUpdateTransactionModel(data?.data),
			error,
			...rest,
		};
	}

	return {
		updateTransaction,
		data: undefined,
		error,
		...rest,
	};
};
