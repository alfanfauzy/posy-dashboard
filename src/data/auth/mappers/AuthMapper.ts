import {Login, RefreshToken} from '@/domain/auth/model';
import {Logout} from '@/domain/auth/repositories/LogoutRepository';
import {RequestResetPassword} from '@/domain/auth/repositories/RequestResetPasswordRepository';
import {ResetPassword} from '@/domain/auth/repositories/ResetPasswordRepository';
import {VerifyToken} from '@/domain/auth/repositories/VerifyTokenRepository';

import {
	LoginDataResponse,
	LogoutDataResponse,
	RefreshTokenDataResponse,
	RequestResetPasswordDataResponse,
	ResetPasswordDataResponse,
	VerifyTokenDataResponse,
} from '../types';

export const mapToLoginModel = (data: LoginDataResponse): Login => ({
	user_info: data.user_info,
	token: data.token,
	refresh_token: data.refresh_token,
	expired_at: data.expired_at.seconds,
});

export const mapToRefreshTokenModel = (
	data: RefreshTokenDataResponse,
): RefreshToken => ({
	token: data.token,
	refresh_token: data.refresh_token,
	uuid: data.uuid,
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

export const mapToResetPasswordModel = (
	data: ResetPasswordDataResponse,
): ResetPassword => ({
	success: data.success,
});

export const mapToLogoutModel = (data: LogoutDataResponse): Logout => ({
	success: data.success,
});
