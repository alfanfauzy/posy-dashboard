import {ResultMutation} from '@/domain/vo/BaseResponse';

export type CreateSetReadNotificationInput = {
	parent_uuid: string;
	parent_type: string;
	notification_uuid: string;
	notification_type: 'transaction' | 'inbox';
};

export type SetReadNotification = {updated_at: number};

export type CreateSetReadNotificationResult = ResultMutation<
	SetReadNotification | undefined
>;

export type CreateSetReadNotificationRepository = {
	createSetReadNotification(input: CreateSetReadNotificationInput): void;
} & CreateSetReadNotificationResult;
