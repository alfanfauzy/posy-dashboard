import {MutationOptions} from '@/data/common/types';
import {
	ResetPasswordInput,
	ResetPasswordRepository,
} from '@/domain/auth/repositories/ResetPasswordRepository';

import {mapToResetPasswordModel} from '../mappers/AuthMapper';
import {useResetPasswordMutation} from '../sources/ResetPasswordMutation';
import {ResetPasswordDataResponse} from '../types';

export const useResetPasswordUsecase = (
	options?: MutationOptions<ResetPasswordDataResponse>,
): ResetPasswordRepository => {
	const {mutate, data, ...rest} = useResetPasswordMutation(options);

	const resetPassword = (input: ResetPasswordInput) => {
		mutate(input);
	};

	if (data?.data) {
		return {
			resetPassword,
			data: mapToResetPasswordModel(data?.data),
			...rest,
		};
	}

	return {
		resetPassword,
		data: undefined,
		...rest,
	};
};
