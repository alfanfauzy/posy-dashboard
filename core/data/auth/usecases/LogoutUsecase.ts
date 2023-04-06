import {MutationOptions} from '@/data/common/types';
import {
	LogoutInput,
	LogoutRepository,
} from '@/domain/auth/repositories/LogoutRepository';

import {mapToLogoutModel} from '../mappers/AuthMapper';
import {useLogoutMutation} from '../sources/LogoutMutation';
import {LogoutDataResponse} from '../types';

export const useLogoutUsecase = (
	options?: MutationOptions<LogoutDataResponse>,
): LogoutRepository => {
	const {mutate, data, ...rest} = useLogoutMutation(options);

	const logout = (input: LogoutInput) => {
		mutate(input);
	};

	if (data?.data) {
		return {
			logout,
			data: mapToLogoutModel(data?.data),
			...rest,
		};
	}

	return {
		logout,
		data: undefined,
		...rest,
	};
};
