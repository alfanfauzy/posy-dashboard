import {mapToBaseError} from '@/data/common/mappers/ErrorMapper';
import {MutationOptions} from '@/data/common/types';
import {
	CreatePrintReceiptInput,
	CreatePrintReceiptRepository,
} from '@/domain/transaction/repositories/CreatePrintReceiptRepository';
import {BaseError} from '@/domain/vo/BaseError';
import {useSnackbar} from 'notistack';

import {mapToReceiptModel} from '../mappers/TransactionMapper';
import {useCreatePrintReceiptMutation} from '../sources/CreatePrintReceiptMutation';

export const useCreatePrintReceiptUsecase = ({
	onError,
	...options
}: MutationOptions): CreatePrintReceiptRepository => {
	let error: BaseError | null = null;
	const {enqueueSnackbar} = useSnackbar();

	const {
		mutate,
		data,
		error: _error,
		...rest
	} = useCreatePrintReceiptMutation({
		onSuccess: dataSuccess => {
			if (dataSuccess) {
				enqueueSnackbar({
					message: 'Receipt Printed Successfully',
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

	const createPrintReceipt = (input: CreatePrintReceiptInput) => {
		mutate(input);
	};

	if (_error) {
		error = mapToBaseError(_error);
	}

	if (data?.data) {
		return {
			createPrintReceipt,
			data: mapToReceiptModel(data?.data),
			error,
			...rest,
		};
	}

	return {
		createPrintReceipt,
		data: undefined,
		error,
		...rest,
	};
};
