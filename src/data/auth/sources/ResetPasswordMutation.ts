'@/data/common/types';
import Post from '@/data/common/api/post';
import {ResetPasswordInput} from '@/domain/auth/repositories/ResetPasswordRepository';
import {Response} from '@/domain/vo/BaseResponse';
import {UseMutationOptions, useMutation} from '@tanstack/react-query';
import {AxiosError} from 'axios';

import {ResetPasswordDataResponse} from '../types';

const ResetPassword = async (
	input: ResetPasswordInput,
): Promise<Response<ResetPasswordDataResponse>> => {
	const response = await Post({
		endpoint: `/user-service/v1/user/forgot-password/reset`,
		data: input,
	});

	return {
		code: response?.code,
		data: response?.data,
		message: response?.message,
		more_info: response?.more_info,
	};
};

export const useResetPasswordMutation = (
	options: UseMutationOptions<
		Response<ResetPasswordDataResponse>,
		AxiosError<Response>,
		ResetPasswordInput
	>,
) =>
	useMutation({
		mutationFn: (input: ResetPasswordInput) => ResetPassword(input),
		...options,
	});
