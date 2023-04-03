import {MutationOptions} from '@/data/common/types';
import {
	CreateCancelTransactionInput,
	CreateCancelTransactionRepository,
} from '@/domain/transaction/repositories/CreateCancelTransactionRepository';

import {mapToCreateCancelTransactionModel} from '../mappers/TransactionMapper';
import {useCreateCancelTransactionMutation} from '../sources/CreateCancelTransactionMutation';
import {CreateCancelTransactionDataResponse} from '../types/CreateCancelTransactionType';

export const useCreateCancelTransactionUsecase = (
	options?: MutationOptions<CreateCancelTransactionDataResponse>,
): CreateCancelTransactionRepository => {
	const {mutate, data, ...rest} = useCreateCancelTransactionMutation(options);

	const createCancelTransaction = (input: CreateCancelTransactionInput) => {
		mutate(input);
	};

	if (data?.data) {
		return {
			createCancelTransaction,
			data: mapToCreateCancelTransactionModel(data?.data),
			...rest,
		};
	}

	return {
		createCancelTransaction,
		data: undefined,
		...rest,
	};
};
