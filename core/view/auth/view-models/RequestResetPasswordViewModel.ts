import {RequestResetPasswordDataResponse} from '@/data/auth/types';
import {useRequestResetPasswordUsecase} from '@/data/auth/usecases/RequestResetPasswordUsecase';
import {MutationOptions} from '@/data/common/types';
import {RequestResetPasswordRepository} from '@/domain/auth/repositories/RequestResetPasswordRepository';

export const useRequestResetPasswordViewModel = (
	options?: MutationOptions<RequestResetPasswordDataResponse>,
): RequestResetPasswordRepository => {
	const result = useRequestResetPasswordUsecase(options);

	return result;
};
