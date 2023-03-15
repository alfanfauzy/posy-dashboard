import {
  SubscriptionSection,
  SubscriptionStatus,
} from '@/domain/subscription/model'

import { GetSubscriptionSectionDataResponse } from '../types'

// map server data to own model
export const mapToSubscriptionSectionModel = (
  data: GetSubscriptionSectionDataResponse,
): SubscriptionSection => ({
  isSubscription: data.status === SubscriptionStatus.INACTIVE,
  status: data.status,
  subscription_name: data.subscription_name,
  end_date: data.end_date,
})
