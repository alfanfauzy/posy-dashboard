import {MutationOptions} from '@/data/common/types';
import {RequestResetPasswordInput} from '@/domain/auth/repositories/RequestResetPasswordRepository';
import {Response} from '@/domain/vo/BaseResponse';
import {useMutation} from '@tanstack/react-query';
import Post from 'api/post';

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
	options?: MutationOptions<RequestResetPasswordDataResponse>,
) =>
	useMutation({
		mutationFn: (input: RequestResetPasswordInput) =>
			RequestResetPassword(input),
		...options,
	});
