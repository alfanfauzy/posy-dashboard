import {ResultQuery} from '@/domain/vo/BaseResponse';

export type VerifyTokenInput = {
	token: string;
};

export type VerifyToken = {
	is_valid: boolean;
};

export type VerifyTokenResult = ResultQuery<VerifyToken | undefined>;
