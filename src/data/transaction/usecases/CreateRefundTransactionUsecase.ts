import {mapToBaseError} from '@/data/common/mappers/ErrorMapper';
import {MutationOptions} from '@/data/common/types';
import {
	CreateRefundTransactionBasedInput,
	CreateRefundTransactionRepository,
} from '@/domain/transaction/repositories/CreateRefundTransactionRepository';
import {BaseError} from '@/domain/vo/BaseError';
import {ValidationSchemaRefundType} from '@/view/history/schemas/RefundSchema';
import {useSnackbar} from 'notistack';

import {
	mapToRefundTransactionModel,
	mapToRefundTransactionPayload,
} from '../mappers/TransactionMapper';
import {useCreateRefundTransactionMutation} from '../sources/CreateRefundTransactionMutation';

export const useCreateRefundTransactionUsecase = ({
	onSuccess,
	onError,
	...options
}: MutationOptions): CreateRefundTransactionRepository => {
	let error: BaseError | null = null;
	const {enqueueSnackbar} = useSnackbar();

	const {
		mutate,
		data,
		error: _error,
		...rest
	} = useCreateRefundTransactionMutation({
		onSuccess: (dataSuccess, ...args) => {
			if (dataSuccess) {
				onSuccess?.(mapToRefundTransactionModel(dataSuccess.data), ...args);
				enqueueSnackbar({
					message: 'Refund Transaction Successfully',
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

	const createRefundTransaction = (
		input: ValidationSchemaRefundType & CreateRefundTransactionBasedInput,
	) => {
		const payload = mapToRefundTransactionPayload(input);
		mutate(payload);
	};

	if (_error) {
		error = mapToBaseError(_error);
	}

	if (data?.data) {
		return {
			createRefundTransaction,
			data: mapToRefundTransactionModel(data?.data),
			error,
			...rest,
		};
	}

	return {
		createRefundTransaction,
		data: undefined,
		error,
		...rest,
	};
};
