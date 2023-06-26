import {Notifications} from '@/domain/notification/model';
import {ResultQuery} from '@/domain/vo/BaseResponse';

export type GetNotificationsInput = {
	is_read: boolean;
	parent_uuid: string;
	parent_type: string;
	notification_type: 'transaction' | 'inbox';
};

export type GetNotificationsResult = ResultQuery<Notifications | undefined>;
