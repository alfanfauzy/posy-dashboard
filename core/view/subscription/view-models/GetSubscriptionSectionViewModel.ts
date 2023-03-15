import { UseQueryOptions } from '@tanstack/react-query'

import { GetSubscriptionSectionDataResponse } from '@/data/subscription/types'
import { useGetSubscriptionSectionUsecase } from '@/data/subscription/usecases/GetSubscriptionSectionUsecase'
import { GetSubscriptionSectionResult } from '@/domain/subscription/repositories/SubscriptionRepository'
import { Response } from '@/domain/vo/BaseResponse'

export const useGetSubscriptionSectionViewModel = (
  options?: UseQueryOptions<Response<GetSubscriptionSectionDataResponse>>,
): GetSubscriptionSectionResult => {
  const result = useGetSubscriptionSectionUsecase(options)

  return result
}
