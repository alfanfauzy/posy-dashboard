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
	PAYMENT_SUCCESS = 'PAYMENT_SUCCESS',
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
