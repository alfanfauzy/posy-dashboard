import {Login} from '@/domain/auth/model';
import {BaseError} from '@/domain/vo/BaseError';
import {ResultMutation} from '@/domain/vo/BaseResponse';

export type LoginInput = {
	email: string;
	password: string;
};

export type LoginResult = ResultMutation<Login, BaseError>;

export type LoginRepository = {
	login(input: LoginInput): void;
} & LoginResult;
