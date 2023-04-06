import {ResultMutation} from '@/domain/vo/BaseResponse';

export type ResetPasswordInput = {
	password: string;
	confirm_password: string;
	token: string;
};

export type ResetPassword = {
	success: boolean;
};

export type ResetPasswordResult = ResultMutation<ResetPassword | undefined>;

export type ResetPasswordRepository = {
	resetPassword(input: ResetPasswordInput): void;
} & ResetPasswordResult;
