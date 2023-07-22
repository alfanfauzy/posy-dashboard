import {mapToBaseError} from '@/data/common/mappers/ErrorMapper';
import {MutationOptions} from '@/data/common/types';
import {PayloadBankCheck} from '@/domain/bank/repositories/CreateCheckBankRepository';
import {BaseError} from '@/domain/vo/BaseError';
import {useSnackbar} from 'notistack';

import {useCreateCheckBankMutation} from '../sources/CreateCheckBankMutation';

export const useCheckBankUsecase = ({
	onSuccess,
	onError,
	...options
}: MutationOptions) => {
	const error: BaseError | null = null;
	const {enqueueSnackbar} = useSnackbar();

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

				enqueueSnackbar({
					message: `${err.title} : ${err.message}`,
					variant: 'error',
				});
			}
		},
		...options,
	});

	const checkBank = (payload: PayloadBankCheck) => {
		mutate(payload);
	};

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
