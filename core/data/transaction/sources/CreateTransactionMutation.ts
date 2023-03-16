import { useMutation } from '@tanstack/react-query'

import { MutationOptions } from '@/data/common/types'
import { CreateTransactionInput } from '@/domain/transaction/repositories/TransactionRepository'
import { Response } from '@/domain/vo/BaseResponse'
import { store } from '@/store/index'

import Post from '../../../../internals/api/post'
import { CreateTransactionDataResponse } from '../types'

const { token } = store.getState().auth.authData

const CreateTransaction = async (
  input: CreateTransactionInput,
): Promise<Response<CreateTransactionDataResponse>> => {
  const response = await Post({
    endpoint: `/api/fnb-order-service/transaction/create`,
    data: {
      ...input,
    },
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

export const useCreateTransactionMutation = (
  options?: MutationOptions<CreateTransactionDataResponse>,
) =>
  useMutation({
    mutationFn: (input: CreateTransactionInput) => CreateTransaction(input),
    ...options,
  })
