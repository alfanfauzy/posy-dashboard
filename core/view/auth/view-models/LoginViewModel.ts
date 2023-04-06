import {LoginDataResponse} from '@/data/auth/types';
import {useLoginUsecase} from '@/data/auth/usecases/LoginUsecase';
import {MutationOptions} from '@/data/common/types';
import {LoginRepository} from '@/domain/auth/repositories/LoginRepository';

export const useLoginViewModel = (
	options?: MutationOptions<LoginDataResponse>,
): LoginRepository => {
	const result = useLoginUsecase(options);

	return result;
};
