import { UseQueryOptions } from '@tanstack/react-query'

import { GetSubscriptionReminderResult } from '@/domain/subscription/repositories/SubscriptionRepository'
import { Response } from '@/domain/vo/BaseResponse'

import { mapToSubscriptionReminderModel } from '../mappers/SubscriptionMapper'
import { useGetSubscriptionReminderQuery } from '../sources/GetSubscriptionReminderQuery'
import { GetSubscriptionReminderDataResponse } from '../types'

export const useGetSubscriptionReminderUsecase = (
  options?: UseQueryOptions<Response<GetSubscriptionReminderDataResponse>>,
): GetSubscriptionReminderResult => {
  const { data, ...rest } = useGetSubscriptionReminderQuery(options)

  if (data?.data) {
    const dataMapper = mapToSubscriptionReminderModel(data.data)

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
