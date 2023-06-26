import {Notifications} from '@/domain/notification/model';
import {SetReadNotification} from '@/domain/notification/repositories/CreateSetReadNotificationRepository';
import {NotificationCounter} from '@/domain/notification/repositories/GetNotificationCounterRepository';

import {CreateSetReadNotificationDataResponse} from '../types/CreateSetReadNotificationType';
import {GetNotificationCounterDataResponse} from '../types/GetNotificationCounterType';
import {GetNotificationsDataResponse} from '../types/GetNotificationsType';

export const mapToNotificationsModel = (
	data: Array<GetNotificationsDataResponse>,
): Notifications =>
	data.map(item => ({
		uuid: item.uuid,
		action: item.action,
		category: item.category,
		content: item.content,
		is_read: item.is_read,
		parent_type: item.parent_type,
		parent_uuid: item.parent_uuid,
		title: item.title,
		transaction_uuid: item.transaction_uuid,
		type: item.type,
		created_at: item.created_at.seconds,
		image_url: item.image_url,
	}));

export const mapToSetReadNotification = (
	data: CreateSetReadNotificationDataResponse,
): SetReadNotification => ({
	updated_at: data.metadata.updated_at.seconds,
});

export const mapToNotificationCounterModel = (
	data: GetNotificationCounterDataResponse,
): NotificationCounter => ({
	inbox: data.inbox,
	transaction: data.transaction,
	total: data.total,
});
