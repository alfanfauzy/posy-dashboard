import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import Post from 'api/post'

import { GetTransactionsInput } from '@/domain/transaction/repositories/TransactionRepository'
import { DataList, Response } from '@/domain/vo/BaseResponse'
import { store } from '@/store/index'

import { GetTransactionsDataResponse } from '../types'

export const GetTransactionsQueryKey = (input?: GetTransactionsInput) =>
  ['transactions/list', input] as const

const { token } = store.getState().auth.authData

const GetTransactions = async (
  input?: GetTransactionsInput,
): Promise<Response<DataList<GetTransactionsDataResponse>>> => {
  const response = await Post({
    endpoint: `/api/fnb-order-service/transaction/get-list`,
    data: input,
    headers: {
      token,
    },
  })

  return {
    code: response?.code,
    data: response?.data as any,
    message: response?.message,
    more_info: response?.more_info,
  }
}

export const useGetTransactionsQuery = (
  input?: GetTransactionsInput,
  options?: UseQueryOptions<Response<DataList<GetTransactionsDataResponse>>>,
) =>
  useQuery<Response<DataList<GetTransactionsDataResponse>>>(
    GetTransactionsQueryKey(input),
    () => GetTransactions(input),
    {
      refetchOnWindowFocus: false,
      ...options,
    },
  )
