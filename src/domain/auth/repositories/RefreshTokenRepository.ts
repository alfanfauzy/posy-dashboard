import {RefreshToken} from '@/domain/auth/model';
import {BaseError} from '@/domain/vo/BaseError';
import {ResultMutation} from '@/domain/vo/BaseResponse';

export type RefreshTokenInput = {
	user_uuid: string;
	token: string;
	refresh_token: string;
};

export type RefreshTokenResult = ResultMutation<RefreshToken, BaseError>;

export type RefreshTokenRepository = {
	RefreshToken(input: RefreshTokenInput): void;
} & RefreshTokenResult;
