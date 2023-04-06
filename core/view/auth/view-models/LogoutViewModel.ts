import {LogoutDataResponse} from '@/data/auth/types';
import {useLogoutUsecase} from '@/data/auth/usecases/LogoutUsecase';
import {MutationOptions} from '@/data/common/types';
import {LogoutRepository} from '@/domain/auth/repositories/LogoutRepository';

export const useLogoutViewModel = (
	options?: MutationOptions<LogoutDataResponse>,
): LogoutRepository => {
	const result = useLogoutUsecase(options);

	return result;
};
