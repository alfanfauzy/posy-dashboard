import {ResultQuery} from '@/domain/vo/BaseResponse';

export type GetNotificationCounterInput = {
	parent_uuid: string;
	parent_type: string;
};

export type NotificationCounter = {
	transaction: number;
	inbox: number;
	total: number;
};

export type GetNotificationCounterResult = ResultQuery<
	NotificationCounter | undefined
>;
