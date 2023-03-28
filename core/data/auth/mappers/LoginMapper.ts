import {Login} from '@/domain/auth/model';

import {LoginDataResponse} from '../types';

export const mapToLoginModel = (data: LoginDataResponse): Login => ({
	uuid: data.uuid,
	token: data.token,
	refresh_token: data.refresh_token,
	expired_at: data.expired_at.seconds,
});
