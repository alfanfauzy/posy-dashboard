import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import Get from 'api/get'

import { Response } from '@/domain/vo/BaseResponse'
import { store } from '@/store/index'

import { GetSubscriptionSectionDataResponse } from '../types'

export const GetSubscriptionSectionQueryKey = (key?: readonly unknown[]) =>
  ['Subscription/section', key] as const

export const GetSubscriptionSection = async (): Promise<
  Response<GetSubscriptionSectionDataResponse>
> => {
  const response = await Get({
    endpoint:
      'api/fnb-user-service/outlet/setting/restaurant/subscription-section',
    headers: {
      token: store.getState().auth.authData.token,
    },
  })

  return {
    code: response?.code,
    data: response?.data as any,
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
