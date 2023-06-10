import {ResultQuery} from '@/domain/vo/BaseResponse';

export type NotificationCounter = {
	transaction: number;
	inbox: number;
	total: number;
};

export type GetNotificationCounterResult = ResultQuery<
	NotificationCounter | undefined
>;
