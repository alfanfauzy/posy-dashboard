import Post from '@/data/common/api/post';
import {RefreshTokenInput} from '@/domain/auth/repositories/RefreshTokenRepository';
import {Response} from '@/domain/vo/BaseResponse';
import {UseMutationOptions, useMutation} from '@tanstack/react-query';
import {AxiosError} from 'axios';

import {RefreshTokenDataResponse} from '../types';

export const RefreshToken = async (
	input: RefreshTokenInput,
): Promise<Response<RefreshTokenDataResponse>> => {
	const response = await Post({
		endpoint: `/user-service/refresh-token`,
		data: input,
	});

	return {
		code: response?.code,
		data: response?.data,
		message: response?.message,
		more_info: response?.more_info,
	};
};

export const useRefreshTokenMutation = (
	options: UseMutationOptions<
		Response<RefreshTokenDataResponse>,
		AxiosError<Response>,
		RefreshTokenInput
	>,
) =>
	useMutation({
		mutationFn: RefreshToken,
		...options,
	});
