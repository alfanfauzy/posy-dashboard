import {MutationOptions} from '@/data/common/types';
import {
	RequestResetPasswordInput,
	RequestResetPasswordRepository,
} from '@/domain/auth/repositories/RequestResetPasswordRepository';

import {mapToRequestResetPasswordModel} from '../mappers/AuthMapper';
import {useRequestResetPasswordMutation} from '../sources/RequestResetPasswordMutation';
import {RequestResetPasswordDataResponse} from '../types';

export const useRequestResetPasswordUsecase = (
	options?: MutationOptions<RequestResetPasswordDataResponse>,
): RequestResetPasswordRepository => {
	const {mutate, data, ...rest} = useRequestResetPasswordMutation(options);

	const requestResetPassword = (input: RequestResetPasswordInput) => {
		mutate(input);
	};

	if (data?.data) {
		return {
			requestResetPassword,
			data: mapToRequestResetPasswordModel(data?.data),
			...rest,
		};
	}

	return {
		requestResetPassword,
		data: undefined,
		...rest,
	};
};
