import Get from '@/data/common/api/get';
import {VerifyTokenInput} from '@/domain/auth/repositories/VerifyTokenRepository';
import {Response} from '@/domain/vo/BaseResponse';
import {UseQueryOptions, useQuery} from '@tanstack/react-query';

import {VerifyTokenDataResponse} from '../types';

export const GetVerifyTokenQueryKey = 'Verify-token' as const;

const VerifyToken = async (
	input: VerifyTokenInput,
): Promise<Response<VerifyTokenDataResponse>> => {
	const response = await Get({
		endpoint: `/user-service/v1/user/forgot-password/verify/${input.token}`,
	});

	return {
		code: response?.code,
		data: response?.data,
		message: response?.message,
		more_info: response?.more_info,
	};
};

export const useVerifyTokenQuery = (
	input: VerifyTokenInput,
	options?: UseQueryOptions<Response<VerifyTokenDataResponse>>,
) =>
	useQuery<Response<VerifyTokenDataResponse>>(
		[GetVerifyTokenQueryKey],
		() => VerifyToken(input),
		{
			refetchOnWindowFocus: false,
			...options,
		},
	);
