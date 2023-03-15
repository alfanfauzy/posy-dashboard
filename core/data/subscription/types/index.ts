enum SubscriptionStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

interface GetSubscriptionSectionDataResponseBased {
  status: SubscriptionStatus
  subscription_name: string
  end_date: number
}

export type GetSubscriptionSectionDataResponse =
  GetSubscriptionSectionDataResponseBased
