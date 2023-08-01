import {useCreateSaveBankAccountMutation} from '@/data/bank/sources/CreateSaveBankAccountMutation';
import {mapToBaseError} from '@/data/common/mappers/ErrorMapper';
import {MutationOptions} from '@/data/common/types';
import {PayloadSaveBankAccount} from '@/domain/bank/repositories/CreateSaveBankRepository';
import {BaseError} from '@/domain/vo/BaseError';

export const useSaveBankAccountUsecase = ({
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
	} = useCreateSaveBankAccountMutation({
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

	const saveBankAccount = (payload: PayloadSaveBankAccount) => {
		mutate(payload);
	};

	if (_error) {
		error = mapToBaseError(_error);
	}

	if (data?.data) {
		return {
			saveBankAccount,
			data: data?.data,
			error,
			...rest,
		};
	}

	return {
		saveBankAccount,
		data: undefined,
		error,
		...rest,
	};
};
