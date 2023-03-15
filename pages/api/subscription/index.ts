import { GetSubscriptionSection } from '@/data/subscription/sources/GetSubscriptionSectionQuery'
import { SubscriptionStatus } from '@/domain/subscription/model'
import { GetSubscriptionSectionServerViewModel } from '@/view/subscription/view-models/GetSubscriptionSectionViewModel'

export const CheckSubscription = async () => {
  // const result = await GetSubscriptionSection()
  const result = await GetSubscriptionSectionServerViewModel()

  return result
}
