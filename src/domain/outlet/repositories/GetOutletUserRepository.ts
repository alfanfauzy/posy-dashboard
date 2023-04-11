import {User} from '@/domain/user/model';
import {ResultQuery} from '@/domain/vo/BaseResponse';

export type GetOutletUserInput = {
	restaurant_outlet_uuid: string;
};

export type OutlerUsers = Array<User>;

export type GetOutletUserResult = ResultQuery<OutlerUsers | undefined>;
