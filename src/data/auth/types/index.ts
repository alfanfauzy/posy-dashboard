import {Metadata} from '@/data/common/types/metadata';

export type LoginDataResponse = {
	user_info: {
		user_uuid: string;
		fullname: string;
		email: string;
		phone: string;
	};
	token: string;
	refresh_token: string;
	expired_at: {
		seconds: number;
		nanos: number;
	};
};

export type RequestResetPasswordDataResponse = {
	success: boolean;
	metadata: Metadata;
};

export type VerifyTokenDataResponse = {
	is_valid: boolean;
};

export type ResetPasswordDataResponse = {
	success: boolean;
};

export type LogoutDataResponse = {
	success: boolean;
};

export type RefreshTokenDataResponse = {
	uuid: string;
	token: string;
	refresh_token: string;
	expired_at: {
		seconds: number;
		nanos: number;
	};
};
