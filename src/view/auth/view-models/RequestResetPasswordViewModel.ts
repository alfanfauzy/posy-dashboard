import {useRequestResetPasswordUsecase} from '@/data/auth/usecases/RequestResetPasswordUsecase';
import {MutationOptions} from '@/data/common/types';
import {RequestResetPasswordRepository} from '@/domain/auth/repositories/RequestResetPasswordRepository';

export const useRequestResetPasswordViewModel = (
	options: MutationOptions,
): RequestResetPasswordRepository => {
	const result = useRequestResetPasswordUsecase(options);

	return result;
};
