import {BaseError} from '@/domain/vo/BaseError';
import {ResultMutation} from '@/domain/vo/BaseResponse';

export type ResetPasswordInput = {
	password: string;
	confirm_password: string;
	token: string;
};

export type ResetPassword = {
	success: boolean;
};

export type ResetPasswordResult = ResultMutation<ResetPassword, BaseError>;

export type ResetPasswordRepository = {
	resetPassword(input: ResetPasswordInput): void;
} & ResetPasswordResult;
