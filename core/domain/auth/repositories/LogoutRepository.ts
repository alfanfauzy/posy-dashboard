import {ResultMutation} from '@/domain/vo/BaseResponse';

export type LogoutInput = {
	user_uuid: string;
	token: string;
};

export type Logout = {
	success: boolean;
};

export type LogoutResult = ResultMutation<Logout | undefined>;

export type LogoutRepository = {
	logout(input: LogoutInput): void;
} & LogoutResult;
