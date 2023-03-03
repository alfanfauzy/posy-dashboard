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
      token: 'ddb4a0da9c6bcc05a64a67a6e5a6994f728945851da6fc127a97e29669b5db78',
    },
    data: input,
  })

  return {
    code: response?.code,
    data: response?.data as any,
    message: response?.message,
    more_info: 'Success',
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
