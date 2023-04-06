import {VerifyTokenDataResponse} from '@/data/auth/types';
import {useVerifyTokenUsecase} from '@/data/auth/usecases/VerifyTokenUsecase';
import {
	VerifyTokenInput,
	VerifyTokenResult,
} from '@/domain/auth/repositories/VerifyTokenRepository';
import {Response} from '@/domain/vo/BaseResponse';
import {UseQueryOptions} from '@tanstack/react-query';

export const useVerifyTokenViewModel = (
	input: VerifyTokenInput,
	options?: UseQueryOptions<Response<VerifyTokenDataResponse>>,
): VerifyTokenResult => {
	const result = useVerifyTokenUsecase(input, options);

	return result;
};
