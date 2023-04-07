import {useResetPasswordUsecase} from '@/data/auth/usecases/ResetPasswordUsecase';
import {MutationOptions} from '@/data/common/types';
import {ResetPasswordRepository} from '@/domain/auth/repositories/ResetPasswordRepository';

export const useResetPasswordViewModel = (
	options: MutationOptions,
): ResetPasswordRepository => {
	const result = useResetPasswordUsecase(options);

	return result;
};
