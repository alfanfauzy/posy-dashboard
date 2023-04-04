import {MutationOptions} from '@/data/common/types';
import {
	CreateMakePaymentInput,
	CreateMakePaymentRepository,
} from '@/domain/transaction/repositories/CreateMakePaymentRepository';

import {mapToCreateMakePaymentModel} from '../mappers/TransactionMapper';
import {useCreateMakePaymentMutation} from '../sources/CreateMakePaymentMutation';
import {CreateMakePaymentDataResponse} from '../types/CreateMakePaymentType';

export const useCreateMakePaymentUsecase = (
	options?: MutationOptions<CreateMakePaymentDataResponse>,
): CreateMakePaymentRepository => {
	const {mutate, data, ...rest} = useCreateMakePaymentMutation(options);

	const makePayment = (input: CreateMakePaymentInput) => {
		mutate(input);
	};

	if (data?.data) {
		return {
			makePayment,
			data: mapToCreateMakePaymentModel(data?.data),
			...rest,
		};
	}

	return {
		makePayment,
		data: undefined,
		...rest,
	};
};
