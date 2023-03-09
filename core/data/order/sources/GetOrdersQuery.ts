import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import Get from 'api/get'

import { GetOrdersInput } from '@/domain/order/repositories/OrderRepository'
import { DataList, Response } from '@/domain/vo/BaseResponse'

import { GetOrdersDataResponse } from '../types'

export const GetOrdersQueryKey = (input?: GetOrdersInput) =>
  ['Orders/list', input] as const

export const GetOrders = async (
  input: GetOrdersInput,
): Promise<Response<DataList<GetOrdersDataResponse>>> => {
  const response = await Get({
    endpoint: `/api/fnb-order-service/order/get-list/${input.transaction_uuid}`,
    headers: {
      token: process.env.NEXT_PUBLIC_TOKEN || '',
    },
  })

  return {
    code: response?.code,
    data: response?.data as any,
    message: response?.message,
    more_info: response?.more_info,
  }
}

export const useGetOrdersQuery = (
  input: GetOrdersInput,
  options?: UseQueryOptions<Response<DataList<GetOrdersDataResponse>>>,
) =>
  useQuery<Response<DataList<GetOrdersDataResponse>>>(
    GetOrdersQueryKey(input),
    () => GetOrders(input),
    {
      refetchOnWindowFocus: false,
      ...options,
    },
  )
