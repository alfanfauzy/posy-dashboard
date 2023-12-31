import {mapToBaseError} from '@/data/common/mappers/ErrorMapper';
import {MutationOptions} from '@/data/common/types';
import {
	CreateApplyDiscountBasedInput,
	CreateApplyDiscountRepository,
} from '@/domain/transaction/repositories/CreateApplyDiscountRepository';
import {BaseError} from '@/domain/vo/BaseError';
import {ValidationSchemaApplyDiscountType} from '@/view/transaction/schemas/apply-discount';
import {useSnackbar} from 'notistack';

import {
	mapToApplyDiscountModel,
	mapToApplyDiscountPayload,
} from '../mappers/TransactionMapper';
import {useCreateApplyDiscountMutation} from '../sources/CreateApplyDiscountMutation';

export const useCreateApplyDiscountUsecase = ({
	onSuccess,
	onError,
	...options
}: MutationOptions): CreateApplyDiscountRepository => {
	let error: BaseError | null = null;
	const {enqueueSnackbar} = useSnackbar();

	const {
		mutate,
		data,
		error: _error,
		...rest
	} = useCreateApplyDiscountMutation({
		onSuccess: (dataSuccess, ...args) => {
			if (dataSuccess) {
				onSuccess?.(mapToApplyDiscountModel(dataSuccess.data), ...args);
				enqueueSnackbar({
					message: 'Discount Applied Successfully',
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

	const createApplyDiscount = (
		input: ValidationSchemaApplyDiscountType & CreateApplyDiscountBasedInput,
	) => {
		const payload = mapToApplyDiscountPayload(input);
		mutate(payload);
	};

	if (_error) {
		error = mapToBaseError(_error);
	}

	if (data?.data) {
		return {
			createApplyDiscount,
			data: mapToApplyDiscountModel(data?.data),
			error,
			...rest,
		};
	}

	return {
		createApplyDiscount,
		data: undefined,
		error,
		...rest,
	};
};
