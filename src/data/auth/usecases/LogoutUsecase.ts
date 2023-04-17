import {mapToBaseError} from '@/data/common/mappers/ErrorMapper';
import {MutationOptions} from '@/data/common/types';
import {
	LogoutInput,
	LogoutRepository,
} from '@/domain/auth/repositories/LogoutRepository';
import {BaseError} from '@/domain/vo/BaseError';
import {useSnackbar} from 'notistack';

import {mapToLogoutModel} from '../mappers/AuthMapper';
import {useLogoutMutation} from '../sources/LogoutMutation';

export const useLogoutUsecase = ({
	onSuccess,
	onError,
	...options
}: MutationOptions): LogoutRepository => {
	let error: BaseError | null = null;
	const {enqueueSnackbar} = useSnackbar();

	const {
		mutate,
		data,
		error: _error,
		...rest
	} = useLogoutMutation({
		onSuccess: (dataSuccess, ...args) => {
			if (dataSuccess) {
				onSuccess?.(mapToLogoutModel(dataSuccess?.data), ...args);
				localStorage.clear();
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

	const logout = (input: LogoutInput) => {
		mutate(input);
	};

	if (_error) {
		error = mapToBaseError(_error);
	}

	if (data?.data) {
		return {
			logout,
			error,
			data: mapToLogoutModel(data?.data),
			...rest,
		};
	}

	return {
		logout,
		error,
		data: undefined,
		...rest,
	};
};
