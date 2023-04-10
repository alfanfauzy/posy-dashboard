import {mapToBaseError} from '@/data/common/mappers/ErrorMapper';
import {MutationOptions} from '@/data/common/types';
import {
	CreateTransactionInput,
	CreateTransactionRepository,
} from '@/domain/transaction/repositories/CreateTransactionRepository';
import {BaseError} from '@/domain/vo/BaseError';
import {useSnackbar} from 'notistack';

import {mapToCreateTransactionModel} from '../mappers/TransactionMapper';
import {useCreateTransactionMutation} from '../sources/CreateTransactionMutation';

export const useCreateTransactionUsecase = ({
	onSuccess,
	onError,
	...options
}: MutationOptions): CreateTransactionRepository => {
	let error: BaseError | null = null;
	const {enqueueSnackbar} = useSnackbar();

	const {
		mutate,
		data,
		error: _error,
		...rest
	} = useCreateTransactionMutation({
		onSuccess: (dataSuccess, ...args) => {
			if (dataSuccess) {
				onSuccess?.(mapToCreateTransactionModel(dataSuccess.data), ...args);
				enqueueSnackbar({
					message: 'Transaction Created Successfully',
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

	const createTransaction = (input: CreateTransactionInput) => {
		mutate(input);
	};

	if (_error) {
		error = mapToBaseError(_error);
	}

	if (data?.data) {
		return {
			createTransaction,
			data: mapToCreateTransactionModel(data?.data),
			error,
			...rest,
		};
	}

	return {
		createTransaction,
		data: undefined,
		error,
		...rest,
	};
};
