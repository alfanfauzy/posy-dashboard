import {
	SubscriptionReminder,
	SubscriptionSection,
	SubscriptionStatus,
} from '@/domain/subscription/model';

import {
	GetSubscriptionReminderDataResponse,
	GetSubscriptionSectionDataResponse,
} from '../types';

// map server data to own model
export const mapToSubscriptionSectionModel = (
	data: GetSubscriptionSectionDataResponse,
): SubscriptionSection => ({
	isSubscription: data.status === SubscriptionStatus.ACTIVE,
	status: data.status,
	subscription_name: data.subscription_name,
	end_date: data.end_date,
});

export const mapToSubscriptionReminderModel = (
	data: GetSubscriptionReminderDataResponse,
): SubscriptionReminder => ({
	is_show: data.is_show,
	end_date: data.end_date,
});
