import { useMutation } from '@tanstack/react-query'
import Post from 'api/post'

import { MutationOptions } from '@/data/common/types'
import { CreateOrderManualInput } from '@/domain/order/repositories/OrderRepository'
import { Response } from '@/domain/vo/BaseResponse'

import { CreateOrderManualDataResponse } from '../types'

const CreateOrderManual = async (
  input: CreateOrderManualInput,
): Promise<Response<CreateOrderManualDataResponse>> => {
  const response = await Post({
    endpoint: `/api/fnb-order-service/order/create`,
    data: input,
  })

  return {
    code: response?.code,
    data: response?.data as any,
    message: response?.message,
    more_info: response?.more_info,
  }
}

export const useCreateOrderManualMutation = (
  options?: MutationOptions<CreateOrderManualDataResponse>,
) =>
  useMutation({
    mutationFn: (input: CreateOrderManualInput) => CreateOrderManual(input),
    ...options,
  })
