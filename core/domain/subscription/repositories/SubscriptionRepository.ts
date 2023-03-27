/**
 * GET
 */

import {
  SubscriptionReminder,
  SubscriptionSection,
} from '@/domain/subscription/model'
import { ResultQuery } from '@/domain/vo/BaseResponse'

export type GetSubscriptionSectionResult = ResultQuery<
  SubscriptionSection | undefined
>

export type GetSubscriptionReminderResult = ResultQuery<
  SubscriptionReminder | undefined
>
