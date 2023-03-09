import { MutationOptions } from '@/data/common/types'
import {
  CreateOrderManualInput,
  CreateOrderManualRepository,
} from '@/domain/order/repositories/OrderRepository'

import { mapToCreateOrderManualModel } from '../mappers/OrderMapper'
import { useCreateOrderManualMutation } from '../sources/CreateOrderManualMutation'
import { CreateOrderManualDataResponse } from '../types'

export const useCreateOrderManualUsecase = (
  options?: MutationOptions<CreateOrderManualDataResponse>,
): CreateOrderManualRepository => {
  const { mutate, data, ...rest } = useCreateOrderManualMutation(options)

  const createOrderManual = (input: CreateOrderManualInput) => {
    mutate(input)
  }

  if (data?.data) {
    return {
      createOrderManual,
      data: mapToCreateOrderManualModel(data?.data),
      ...rest,
    }
  }

  return {
    createOrderManual,
    data: undefined,
    ...rest,
  }
}
