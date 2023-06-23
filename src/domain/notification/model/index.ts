export enum NotificationCategory {
	ORDER = 'ORDER',
}

enum NotificationType {
	TRANSACTION = 'transaction',
	INBOX = 'inbox',
}

export enum NotificationAction {
	RECEIVED_NEW_ORDER = 'RECEIVED_NEW_ORDER',
	TRANSACTION_HAS_BEEN_PAID = 'TRANSACTION_HAS_BEEN_PAID',
}

type NotificationBased = {
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
	created_at: number;
	image_url: string;
};

export type Notification = NotificationBased;
export type Notifications = Array<NotificationBased>;
