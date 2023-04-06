import {MutationOptions} from '@/data/common/types';
import {
	CreatePrintReceiptInput,
	CreatePrintReceiptRepository,
} from '@/domain/transaction/repositories/CreatePrintReceiptRepository';

import {mapToReceiptModel} from '../mappers/TransactionMapper';
import {useCreatePrintReceiptMutation} from '../sources/CreatePrintReceiptMutation';
import {CreatePrintReceiptDataResponse} from '../types/CreatePrintReceiptType';

export const useCreatePrintReceiptUsecase = (
	options?: MutationOptions<CreatePrintReceiptDataResponse>,
): CreatePrintReceiptRepository => {
	const {mutate, data, ...rest} = useCreatePrintReceiptMutation(options);

	const createPrintReceipt = (input: CreatePrintReceiptInput) => {
		mutate(input);
	};

	if (data?.data) {
		return {
			createPrintReceipt,
			data: mapToReceiptModel(data?.data),
			...rest,
		};
	}

	return {
		createPrintReceipt,
		data: undefined,
		...rest,
	};
};
