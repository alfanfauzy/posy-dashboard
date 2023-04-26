import {mapToBaseError} from '@/data/common/mappers/ErrorMapper';
import {MutationOptions} from '@/data/common/types';
import {
	RequestResetPasswordInput,
	RequestResetPasswordRepository,
} from '@/domain/auth/repositories/RequestResetPasswordRepository';
import {BaseError} from '@/domain/vo/BaseError';
import {useSnackbar} from 'notistack';

import {mapToRequestResetPasswordModel} from '../mappers/AuthMapper';
import {useRequestResetPasswordMutation} from '../sources/RequestResetPasswordMutation';

export const useRequestResetPasswordUsecase = ({
	onError,
	onSuccess,
	...options
}: MutationOptions): RequestResetPasswordRepository => {
	let error: BaseError | null = null;
	const {enqueueSnackbar} = useSnackbar();

	const {
		mutate,
		data,
		error: _error,
		...rest
	} = useRequestResetPasswordMutation({
		onSuccess: (dataSuccess, ...args) => {
			if (dataSuccess) {
				onSuccess?.(mapToRequestResetPasswordModel(dataSuccess?.data), ...args);
				enqueueSnackbar({
					message: 'Password reset link has been sent',
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

	const requestResetPassword = (input: RequestResetPasswordInput) => {
		mutate(input);
	};

	if (_error) {
		error = mapToBaseError(_error);
	}

	if (data?.data) {
		return {
			requestResetPassword,
			data: mapToRequestResetPasswordModel(data?.data),
			error,
			...rest,
		};
	}

	return {
		requestResetPassword,
		data: undefined,
		error,
		...rest,
	};
};
