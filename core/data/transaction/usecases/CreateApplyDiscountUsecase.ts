import {MutationOptions} from '@/data/common/types';
import {
	CreateApplyDiscountBasedInput,
	CreateApplyDiscountRepository,
} from '@/domain/transaction/repositories/CreateApplyDiscountRepository';
import {ValidationSchemaApplyDiscountType} from '@/view/transaction/schemas/apply-discount';

import {
	mapToCreateApplyDiscountModel,
	mapToCreateApplyDiscountPayload,
} from '../mappers/TransactionMapper';
import {useCreateApplyDiscountMutation} from '../sources/CreateApplyDiscountMutation';
import {CreateApplyDiscountDataResponse} from '../types/CreateApplyDiscountType';

export const useCreateApplyDiscountUsecase = (
	options?: MutationOptions<CreateApplyDiscountDataResponse>,
): CreateApplyDiscountRepository => {
	const {mutate, data, ...rest} = useCreateApplyDiscountMutation(options);

	const createApplyDiscount = (
		input: ValidationSchemaApplyDiscountType & CreateApplyDiscountBasedInput,
	) => {
		const payload = mapToCreateApplyDiscountPayload(input);
		mutate(payload);
	};

	if (data?.data) {
		return {
			createApplyDiscount,
			data: mapToCreateApplyDiscountModel(data?.data),
			...rest,
		};
	}

	return {
		createApplyDiscount,
		data: undefined,
		...rest,
	};
};
