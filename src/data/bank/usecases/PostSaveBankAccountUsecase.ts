import {useCreateSaveBankAccountMutation} from '@/data/bank/sources/PostSaveBankAccountMutation';
import {mapToBaseError} from '@/data/common/mappers/ErrorMapper';
import {MutationOptions} from '@/data/common/types';
import {PayloadSaveBankAccount} from '@/domain/bank/repositories/BankRepository';
import {BaseError} from '@/domain/vo/BaseError';
import {useSnackbar} from 'notistack';

export const useSaveBankAccountUsecase = ({
	onSuccess,
	onError,
	...options
}: MutationOptions) => {
	let error: BaseError | null = null;
	const {enqueueSnackbar} = useSnackbar();

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

				enqueueSnackbar({
					message: `${err.title} : ${err.message}`,
					variant: 'error',
				});
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
