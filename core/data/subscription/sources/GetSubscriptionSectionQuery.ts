import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import Get from 'api/get'

import { Response } from '@/domain/vo/BaseResponse'

// import { store } from '@/store/index'
import { GetSubscriptionSectionDataResponse } from '../types'

export const GetSubscriptionSectionQueryKey = ['Subscription/section'] as const

// const { token } = store.getState().auth.authData

export const GetSubscriptionSection = async (): Promise<
  Response<GetSubscriptionSectionDataResponse>
> => {
  const response = await Get({
    baseURL: 'http://localhost:9994/',
    endpoint:
      'api/fnb-user-service/outlet/setting/restaurant/subscription-section',
    headers: {
      token: '14b5811a4f7fdbead5bfdc14769f578a4a89506c11996dc3bad4587eb8ae4f19',
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
    GetSubscriptionSectionQueryKey,
    () => GetSubscriptionSection(),
    {
      refetchOnWindowFocus: false,
      ...options,
    },
  )
