import { UseQueryOptions } from '@tanstack/react-query'

import { GetSubscriptionSectionDataResponse } from '@/data/subscription/types'
import {
  GetSubscriptionSectionServerUsecase,
  useGetSubscriptionSectionUsecase,
} from '@/data/subscription/usecases/GetSubscriptionSectionUsecase'
import { SubscriptionSection } from '@/domain/subscription/model'
import { GetSubscriptionSectionResult } from '@/domain/subscription/repositories/SubscriptionRepository'
import { Response } from '@/domain/vo/BaseResponse'

export const useGetSubscriptionSectionViewModel = (
  options?: UseQueryOptions<Response<GetSubscriptionSectionDataResponse>>,
): GetSubscriptionSectionResult => {
  const result = useGetSubscriptionSectionUsecase(options)

  return result
}

export const GetSubscriptionSectionServerViewModel = (): Promise<
  SubscriptionSection | undefined
> => {
  const result = GetSubscriptionSectionServerUsecase()

  return result
}
