import { UseQueryOptions } from '@tanstack/react-query'

import { SubscriptionSection } from '@/domain/subscription/model'
import { GetSubscriptionSectionResult } from '@/domain/subscription/repositories/SubscriptionRepository'
import { Response } from '@/domain/vo/BaseResponse'

import { mapToSubscriptionSectionModel } from '../mappers/SubscriptionMapper'
import {
  GetSubscriptionSection,
  useGetSubscriptionSectionQuery,
} from '../sources/GetSubscriptionSectionQuery'
import { GetSubscriptionSectionDataResponse } from '../types'

export const useGetSubscriptionSectionUsecase = (
  options?: UseQueryOptions<Response<GetSubscriptionSectionDataResponse>>,
): GetSubscriptionSectionResult => {
  const { data, ...rest } = useGetSubscriptionSectionQuery(options)

  if (data?.data) {
    const dataMapper = mapToSubscriptionSectionModel(data.data)

    return {
      data: dataMapper,
      ...rest,
    }
  }

  return {
    data: undefined,
    ...rest,
  }
}

export const GetSubscriptionSectionServerUsecase = async (): Promise<
  SubscriptionSection | undefined
> => {
  const data = await GetSubscriptionSection()

  if (data?.data) {
    const dataMapper = mapToSubscriptionSectionModel(data.data)

    return dataMapper
  }

  return undefined
}
