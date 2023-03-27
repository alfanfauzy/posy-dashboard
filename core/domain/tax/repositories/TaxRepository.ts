/**
 * GET
 */

import { SubscriptionSection } from '@/domain/subscription/model'
import { ResultQuery } from '@/domain/vo/BaseResponse'

export type GetTaxResult = ResultQuery<SubscriptionSection | undefined>
