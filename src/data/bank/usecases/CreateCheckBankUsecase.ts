import {mapToBaseError} from '@/data/common/mappers/ErrorMapper';
import {MutationOptions} from '@/data/common/types';
import {PayloadBankCheck} from '@/domain/bank/repositories/CreateCheckBankRepository';
import {BaseError} from '@/domain/vo/BaseError';

import {useCreateCheckBankMutation} from '../sources/CreateCheckBankMutation';

export const useCheckBankUsecase = ({
	onSuccess,
	onError,
	...options
}: MutationOptions) => {
	let error: BaseError | null = null;

	const {
		mutate,
		data,
		error: _error,
		...rest
	} = useCreateCheckBankMutation({
		onSuccess: (dataSuccess, ...args) => {
			if (dataSuccess) {
				onSuccess?.(dataSuccess, ...args);
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

	const checkBank = (payload: PayloadBankCheck) => {
		mutate(payload);
	};

	if (_error) {
		error = mapToBaseError(_error);
	}

	if (data?.data) {
		return {
			checkBank,
			data: data?.data,
			error,
			...rest,
		};
	}

	return {
		checkBank,
		data: data?.data,
		...rest,
	};
};
