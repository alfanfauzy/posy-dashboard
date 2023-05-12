import {Metadata} from '@/data/common/types/metadata';

export type Access = Array<{
	description: string;
	is_internal: boolean;
	key: string;
	name: string;
	uuid: string;
}>;

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
	role_access: {
		role: {
			accesses: null;
			is_internal: boolean;
			name: string;
			uuid: string;
		};
		accesses: Access;
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
