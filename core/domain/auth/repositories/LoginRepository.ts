import {Login} from '@/domain/auth/model';
import {ResultMutation} from '@/domain/vo/BaseResponse';

export type LoginInput = {
	email: string;
	password: string;
};

export type LoginResult = ResultMutation<Login | undefined>;

export type LoginRepository = {
	login(input: LoginInput): void;
} & LoginResult;
