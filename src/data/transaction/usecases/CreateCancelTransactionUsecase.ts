import {mapToBaseError} from '@/data/common/mappers/ErrorMapper';
import {MutationOptions} from '@/data/common/types';
import {
	CreateCancelTransactionInput,
	CreateCancelTransactionRepository,
} from '@/domain/transaction/repositories/CreateCancelTransactionRepository';
import {BaseError} from '@/domain/vo/BaseError';
import {useSnackbar} from 'notistack';

import {mapToCancelTransactionModel} from '../mappers/TransactionMapper';
import {useCreateCancelTransactionMutation} from '../sources/CreateCancelTransactionMutation';

export const useCreateCancelTransactionUsecase = ({
	onSuccess,
	onError,
	...options
}: MutationOptions): CreateCancelTransactionRepository => {
	let error: BaseError | null = null;
	const {enqueueSnackbar} = useSnackbar();

	const {
		mutate,
		data,
		error: _error,
		...rest
	} = useCreateCancelTransactionMutation({
		onSuccess: (dataSuccess, ...args) => {
			if (dataSuccess) {
				onSuccess?.(mapToCancelTransactionModel(dataSuccess.data), ...args);
				enqueueSnackbar({
					message: 'Transaction Cancelled Successfully',
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

	const createCancelTransaction = (input: CreateCancelTransactionInput) => {
		mutate(input);
	};

	if (_error) {
		error = mapToBaseError(_error);
	}

	if (data?.data) {
		return {
			createCancelTransaction,
			data: mapToCancelTransactionModel(data?.data),
			error,
			...rest,
		};
	}

	return {
		createCancelTransaction,
		data: undefined,
		error,
		...rest,
	};
};
