import {Login} from '@/domain/auth/model';
import {RequestResetPassword} from '@/domain/auth/repositories/RequestResetPasswordRepository';
import {VerifyToken} from '@/domain/auth/repositories/VerifyTokenRepository';

import {
	LoginDataResponse,
	RequestResetPasswordDataResponse,
	VerifyTokenDataResponse,
} from '../types';

export const mapToLoginModel = (data: LoginDataResponse): Login => ({
	user_info: data.user_info,
	token: data.token,
	refresh_token: data.refresh_token,
	expired_at: data.expired_at.seconds,
});

export const mapToRequestResetPasswordModel = (
	data: RequestResetPasswordDataResponse,
): RequestResetPassword => ({
	success: data.success,
	metadata: {
		created_at: data.metadata.created_at.seconds,
	},
});

export const mapToVerifyTokenModel = (
	data: VerifyTokenDataResponse,
): VerifyToken => ({
	is_valid: data.is_valid,
});
