import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import Post from 'api/post'

import { InputVariables } from '@/domain/vo/BaseInput'
import { DataList, Response } from '@/domain/vo/BaseResponse'

import { GetTransactionsDataResponse } from '../types'

export const GetTransactionsQueryKey = ['transactions/list'] as const

export const GetTransactions = async (
  input?: InputVariables<
    keyof GetTransactionsDataResponse,
    keyof Pick<
      GetTransactionsDataResponse,
      'customer_name' | 'transaction_code'
    >
  >,
): Promise<Response<DataList<GetTransactionsDataResponse>>> => {
  const response = await Post({
    endpoint: `/api/fnb-order-service/transaction/get-list`,
    headers: {
      token: process.env.NEXT_PUBLIC_TOKEN || '',
    },
    data: input,
  })

  return {
    code: response?.code,
    data: response?.data as any,
    message: response?.message,
    more_info: response?.more_info,
  }
}

export const useGetTransactionsQuery = (
  input?: any,
  options?: UseQueryOptions<Response<DataList<GetTransactionsDataResponse>>>,
) =>
  useQuery<Response<DataList<GetTransactionsDataResponse>>>(
    GetTransactionsQueryKey,
    () => GetTransactions(input),
    {
      refetchOnWindowFocus: false,
      ...options,
    },
  )
