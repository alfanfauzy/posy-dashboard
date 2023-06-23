import {CreatedAt} from '@/data/common/types/metadata';

enum NotificationCategory {
	ORDER = 'ORDER',
}

enum NotificationType {
	TRANSACTION = 'transaction',
	INBOX = 'inbox',
}

enum NotificationAction {
	RECEIVED_NEW_ORDER = 'RECEIVED_NEW_ORDER',
	TRANSACTION_HAS_BEEN_PAID = 'TRANSACTION_HAS_BEEN_PAID',
}

export type GetNotificationsDataResponse = {
	uuid: string;
	parent_uuid: string;
	parent_type: string;
	transaction_uuid: string;
	title: string;
	content: string;
	category: NotificationCategory;
	action: NotificationAction;
	is_read: boolean;
	type: NotificationType;
	created_at: CreatedAt;
	image_url: string;
};
