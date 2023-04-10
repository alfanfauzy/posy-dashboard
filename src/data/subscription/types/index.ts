enum SubscriptionStatus {
	ACTIVE = 'ACTIVE',
	INACTIVE = 'INACTIVE',
}

type GetSubscriptionSectionDataResponseBased = {
	status: SubscriptionStatus;
	subscription_name: string;
	end_date: number;
};

export type GetSubscriptionSectionDataResponse =
	GetSubscriptionSectionDataResponseBased;

export type GetSubscriptionReminderDataResponse = {
	is_show: boolean;
	end_date: number;
};
