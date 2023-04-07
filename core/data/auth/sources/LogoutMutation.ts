import {LogoutInput} from '@/domain/auth/repositories/LogoutRepository';
import {Response} from '@/domain/vo/BaseResponse';
import {UseMutationOptions, useMutation} from '@tanstack/react-query';
import Post from 'api/post';
import {AxiosError} from 'axios';

import {LogoutDataResponse} from '../types';

const Logout = async (
	input: LogoutInput,
): Promise<Response<LogoutDataResponse>> => {
	const response = await Post({
		endpoint: `/user-service/v1/user/logout`,
		data: input,
	});

	return {
		code: response?.code,
		data: response?.data,
		message: response?.message,
		more_info: response?.more_info,
	};
};

export const useLogoutMutation = (
	options: UseMutationOptions<
		Response<LogoutDataResponse>,
		AxiosError<Response>,
		LogoutInput
	>,
) =>
	useMutation({
		mutationFn: Logout,
		...options,
	});
