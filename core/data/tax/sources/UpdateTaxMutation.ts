import { useMutation } from '@tanstack/react-query'
import Post from 'api/post'

import { MutationOptions } from '@/data/common/types'
import { UpdateTaxInput } from '@/domain/tax/repositories/TaxRepository'
import { Response } from '@/domain/vo/BaseResponse'

import { UpdateTaxDataResponse } from '../types'

const UpdateTax = async (
  input: UpdateTaxInput,
): Promise<Response<UpdateTaxDataResponse>> => {
  const response = await Post({
    endpoint: `/user-service/outlet/setting/tax/update`,
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

export const useUpdateTaxMutation = (
  options?: MutationOptions<UpdateTaxDataResponse>,
) =>
  useMutation({
    mutationFn: (input: UpdateTaxInput) => UpdateTax(input),
    ...options,
  })
