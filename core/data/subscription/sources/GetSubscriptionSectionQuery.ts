import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import Get from 'api/get'

import { Response } from '@/domain/vo/BaseResponse'

import { GetSubscriptionSectionDataResponse } from '../types'

export const GetSubscriptionSectionQueryKey = (key?: readonly unknown[]) =>
  ['Subscription/section', key] as const

export const GetSubscriptionSection = async (): Promise<
  Response<GetSubscriptionSectionDataResponse>
> => {
  const response = await Get({
    endpoint: '/user-service/outlet/setting/restaurant/subscription-section',
  })

  return {
    code: response?.code,
    data: response?.data,
    message: response?.message,
    more_info: response?.more_info,
  }
}

export const useGetSubscriptionSectionQuery = (
  options?: UseQueryOptions<Response<GetSubscriptionSectionDataResponse>>,
) =>
  useQuery<Response<GetSubscriptionSectionDataResponse>>(
    GetSubscriptionSectionQueryKey(options?.queryKey),
    () => GetSubscriptionSection(),
    {
      refetchOnWindowFocus: false,
      ...options,
    },
  )
