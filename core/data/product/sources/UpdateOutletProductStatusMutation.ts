import { useMutation } from '@tanstack/react-query'
import Post from 'api/post'

import { MutationOptions } from '@/data/common/types'
import { UpdateOutletProductStatusInput } from '@/domain/product/repositories/ProductRepository'
import { Response } from '@/domain/vo/BaseResponse'

import { UpdateOutletProductStatusDataResponse } from '../types/OutletProduct'

const UpdateOutletProductStatus = async (
  input: UpdateOutletProductStatusInput,
): Promise<Response<UpdateOutletProductStatusDataResponse>> => {
  const response = await Post({
    endpoint: `/product-service/product-outlet/update-status`,
    data: input,
  })

  return {
    code: response?.code,
    data: response?.data as any,
    message: response?.message,
    more_info: response?.more_info,
  }
}

export const useUpdateOutletProductStatusMutation = (
  options?: MutationOptions<UpdateOutletProductStatusDataResponse>,
) =>
  useMutation({
    mutationFn: (input: UpdateOutletProductStatusInput) =>
      UpdateOutletProductStatus(input),
    ...options,
  })
