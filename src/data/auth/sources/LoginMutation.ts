import Post from '@/data/common/api/post';
import {LoginInput} from '@/domain/auth/repositories/LoginRepository';
import {Response} from '@/domain/vo/BaseResponse';
import {UseMutationOptions, useMutation} from '@tanstack/react-query';
import {AxiosError} from 'axios';

import {LoginDataResponse} from '../types';

const Login = async (
	input: LoginInput,
): Promise<Response<LoginDataResponse>> => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const {notif_token, ...data} = input;

	const response = await Post({
		endpoint: `/user-service/v1/user/login`,
		data,
		headers: {
			// eslint-disable-next-line @typescript-eslint/naming-convention
			'Notification-Token': input.notif_token,
		},
	});

	return {
		code: response?.code,
		data: response?.data,
		message: response?.message,
		more_info: response?.more_info,
	};
};

export const useLoginMutation = (
	options: UseMutationOptions<
		Response<LoginDataResponse>,
		AxiosError<Response>,
		LoginInput
	>,
) =>
	useMutation({
		mutationFn: Login,
		...options,
	});
