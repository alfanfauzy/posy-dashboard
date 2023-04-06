import {MutationOptions} from '@/data/common/types';
import {ResetPasswordInput} from '@/domain/auth/repositories/ResetPasswordRepository';
import {Response} from '@/domain/vo/BaseResponse';
import {useMutation} from '@tanstack/react-query';
import Post from 'api/post';

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
	options?: MutationOptions<ResetPasswordDataResponse>,
) =>
	useMutation({
		mutationFn: (input: ResetPasswordInput) => ResetPassword(input),
		...options,
	});
