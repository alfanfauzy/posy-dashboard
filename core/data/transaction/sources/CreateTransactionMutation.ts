import { useMutation } from '@tanstack/react-query'
import Post from 'api/post'

import { MutationOptions } from '@/data/common/types'
import { Response } from '@/domain/vo/BaseResponse'

import { CreateTransactionDataResponse } from '../types'

const CreateTransaction = async (): Promise<
  Response<CreateTransactionDataResponse>
> => {
  const response = await Post({
    endpoint: `/api/fnb-order-service/transaction/create`,
    data: {},
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
    mutationFn: CreateTransaction,
    ...options,
  })
