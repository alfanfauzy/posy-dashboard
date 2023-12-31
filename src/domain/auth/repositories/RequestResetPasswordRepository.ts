import {BaseError} from '@/domain/vo/BaseError';
import {Metadata} from '@/domain/vo/BaseMetadata';
import {ResultMutation} from '@/domain/vo/BaseResponse';

export type RequestResetPasswordInput = {
	email: string;
};

export type RequestResetPassword = {
	success: boolean;
	metadata: Metadata;
};

export type RequestResetPasswordResult = ResultMutation<
	RequestResetPassword,
	BaseError
>;

export type RequestResetPasswordRepository = {
	requestResetPassword(input: RequestResetPasswordInput): void;
} & RequestResetPasswordResult;
