export enum SubscriptionStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

interface SubscriptionSectionBased {
  isSubscription: boolean
  status: SubscriptionStatus
  subscription_name: string
  end_date: number
}

export type SubscriptionSection = SubscriptionSectionBased
