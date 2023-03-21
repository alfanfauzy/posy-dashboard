import { useMutation } from '@tanstack/react-query'
import Post from 'api/post'

import { MutationOptions } from '@/data/common/types'
import { CreateTransactionInput } from '@/domain/transaction/repositories/TransactionRepository'
import { Response } from '@/domain/vo/BaseResponse'

import { CreateTransactionDataResponse } from '../types'

const CreateTransaction = async (
  input: CreateTransactionInput,
): Promise<Response<CreateTransactionDataResponse>> => {
  const response = await Post({
    endpoint: `/order-service/transaction/create`,
    data: {
      ...input,
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
