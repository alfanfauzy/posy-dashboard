export enum NotificationCategory {
	ORDER = 'ORDER',
}

enum NotificationType {
	TRANSACTION = 'transaction',
	INBOX = 'inbox',
}

type NotificationBased = {
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
	created_at: number;
};

export type Notification = NotificationBased;
export type Notifications = Array<NotificationBased>;
