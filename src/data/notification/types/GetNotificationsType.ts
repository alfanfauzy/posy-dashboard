import {CreatedAt} from '@/data/common/types/metadata';

enum NotificationCategory {
	ORDER = 'ORDER',
}

enum NotificationType {
	TRANSACTION = 'transaction',
	INBOX = 'inbox',
}

export type GetNotificationsDataResponse = {
	uuid: string;
	parent_uuid: string;
	parent_type: string;
	transaction_uuid: string;
	title: string;
	content: string;
	category: NotificationCategory;
	action: string;
	is_read: boolean;
	type: NotificationType;
	created_at: CreatedAt;
};
