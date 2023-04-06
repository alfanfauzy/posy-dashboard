import {MutationOptions} from '@/data/common/types';
import {LoginInput} from '@/domain/auth/repositories/LoginRepository';
import {Response} from '@/domain/vo/BaseResponse';
import {useMutation} from '@tanstack/react-query';
import Post from 'api/post';

import {LoginDataResponse} from '../types';

const Login = async (
	input: LoginInput,
): Promise<Response<LoginDataResponse>> => {
	const response = await Post({
		endpoint: `/user-service/v1/user/login`,
		data: input,
	});

	return {
		code: response?.code,
		data: response?.data,
		message: response?.message,
		more_info: response?.more_info,
	};
};

export const useLoginMutation = (
	options?: MutationOptions<LoginDataResponse>,
) =>
	useMutation({
		mutationFn: (input: LoginInput) => Login(input),
		...options,
	});
