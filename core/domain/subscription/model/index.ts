export enum SubscriptionStatus {
	ACTIVE = 'ACTIVE',
	INACTIVE = 'INACTIVE',
}

type SubscriptionSectionBased = {
	isSubscription: boolean;
	status: SubscriptionStatus;
	subscription_name: string;
	end_date: number;
};

export type SubscriptionSection = SubscriptionSectionBased;

export type SubscriptionReminder = {
	is_show: boolean;
	end_date: number;
};
