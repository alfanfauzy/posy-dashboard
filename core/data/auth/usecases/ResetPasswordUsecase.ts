import {mapToBaseError} from '@/data/common/mappers/ErrorMapper';
import {MutationOptions} from '@/data/common/types';
import {
	ResetPasswordInput,
	ResetPasswordRepository,
} from '@/domain/auth/repositories/ResetPasswordRepository';
import {BaseError} from '@/domain/vo/BaseError';
import {useSnackbar} from 'notistack';

import {mapToResetPasswordModel} from '../mappers/AuthMapper';
import {useResetPasswordMutation} from '../sources/ResetPasswordMutation';

export const useResetPasswordUsecase = ({
	onError,
	onSuccess,
	...options
}: MutationOptions): ResetPasswordRepository => {
	let error: BaseError | null = null;
	const {enqueueSnackbar} = useSnackbar();

	const {
		mutate,
		data,
		error: _error,
		...rest
	} = useResetPasswordMutation({
		onSuccess: (dataSuccess, ...args) => {
			if (dataSuccess) {
				onSuccess?.(mapToResetPasswordModel(dataSuccess?.data), ...args);
				enqueueSnackbar({
					message: 'Password has been reset',
					variant: 'success',
				});
			}
		},
		onError: (dataError, ...args) => {
			if (dataError) {
				const err = mapToBaseError(dataError);
				onError?.(err, ...args);
				enqueueSnackbar({
					message: err.message,
					variant: 'error',
				});
			}
		},
		...options,
	});

	const resetPassword = (input: ResetPasswordInput) => {
		mutate(input);
	};

	if (_error) {
		error = mapToBaseError(_error);
	}

	if (data?.data) {
		return {
			error,
			resetPassword,
			data: mapToResetPasswordModel(data?.data),
			...rest,
		};
	}

	return {
		error,
		resetPassword,
		data: undefined,
		...rest,
	};
};
