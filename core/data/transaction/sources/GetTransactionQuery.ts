import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import Get from 'api/get'

import { GetTransactionInput } from '@/domain/transaction/repositories/TransactionRepository'
import { Response } from '@/domain/vo/BaseResponse'
import { store } from '@/store/index'

import { GetTransactionDataResponse } from '../types'

export const GetTransactionQueryKey = (input?: GetTransactionInput) =>
  ['transactions/detail', input] as const

const { token } = store.getState().auth.authData

const GetTransaction = async (
  input?: GetTransactionInput,
): Promise<Response<GetTransactionDataResponse>> => {
  const response = await Get({
    endpoint: `/api/fnb-order-service/transaction/get-detail/${input?.transaction_uuid}`,
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

export const useGetTransactionQuery = (
  input?: GetTransactionInput,
  options?: UseQueryOptions<Response<GetTransactionDataResponse>>,
) =>
  useQuery<Response<GetTransactionDataResponse>>(
    GetTransactionQueryKey(input),
    () => GetTransaction(input),
    {
      refetchOnWindowFocus: false,
      ...options,
    },
  )
