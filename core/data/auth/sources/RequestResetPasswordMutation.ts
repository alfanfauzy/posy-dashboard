import {RequestResetPasswordInput} from '@/domain/auth/repositories/RequestResetPasswordRepository';
import {Response} from '@/domain/vo/BaseResponse';
import {UseMutationOptions, useMutation} from '@tanstack/react-query';
import Post from 'api/post';
import {AxiosError} from 'axios';

import {RequestResetPasswordDataResponse} from '../types';

const RequestResetPassword = async (
	input: RequestResetPasswordInput,
): Promise<Response<RequestResetPasswordDataResponse>> => {
	const response = await Post({
		endpoint: `/user-service/v1/user/forgot-password/request`,
		data: input,
	});

	return {
		code: response?.code,
		data: response?.data,
		message: response?.message,
		more_info: response?.more_info,
	};
};

export const useRequestResetPasswordMutation = (
	options: UseMutationOptions<
		Response<RequestResetPasswordDataResponse>,
		AxiosError<Response>,
		RequestResetPasswordInput
	>,
) =>
	useMutation({
		mutationFn: RequestResetPassword,
		...options,
	});
