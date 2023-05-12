import {User} from '@/domain/user/model';

import {Accesses} from './access';
import {Role} from './role';

type LoginBased = {
	token: string;
	refresh_token: string;
	expired_at: number;
	user_info: User;
	role: Role;
	accesses: Accesses;
};

export type Login = LoginBased;

type RefreshTokenBased = {
	uuid: string;
	token: string;
	refresh_token: string;
	expired_at: number;
};

export type RefreshToken = RefreshTokenBased;
