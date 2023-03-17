import { MutationOptions } from '@/data/common/types'
import {
  UpdateOutletProductStatusInput,
  UpdateOutletProductStatusRepository,
} from '@/domain/product/repositories/ProductRepository'

import { mapToUpdateOutletProductStatusModel } from '../mappers/ProductMapper'
import { useUpdateOutletProductStatusMutation } from '../sources/UpdateOutletProductStatusMutation'
import { UpdateOutletProductStatusDataResponse } from '../types/OutletProduct'

export const useUpdateOutletProductStatusUsecase = (
  options?: MutationOptions<UpdateOutletProductStatusDataResponse>,
): UpdateOutletProductStatusRepository => {
  const { mutate, data, ...rest } =
    useUpdateOutletProductStatusMutation(options)

  const updateOutletProductStatus = (input: UpdateOutletProductStatusInput) => {
    mutate(input)
  }

  if (data?.data) {
    return {
      updateOutletProductStatus,
      data: mapToUpdateOutletProductStatusModel(data?.data),
      ...rest,
    }
  }

  return {
    updateOutletProductStatus,
    data: undefined,
    ...rest,
  }
}
