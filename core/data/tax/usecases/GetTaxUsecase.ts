import { UseQueryOptions } from '@tanstack/react-query'

import {
  GetTaxInput,
  GetTaxResult,
} from '@/domain/tax/repositories/TaxRepository'
import { Response } from '@/domain/vo/BaseResponse'

import { mapToTaxModel } from '../mappers/TaxMapper'
import { useGetTaxQuery } from '../sources/GetTaxQuery'
import { GetTaxDataResponse } from '../types'

export const useGetTaxUsecase = (
  input: GetTaxInput,
  options?: UseQueryOptions<Response<GetTaxDataResponse>>,
): GetTaxResult => {
  const { data, ...rest } = useGetTaxQuery(input, options)

  if (data?.data) {
    const dataMapper = mapToTaxModel(data.data)

    return {
      data: dataMapper,
      ...rest,
    }
  }

  return {
    data: undefined,

    ...rest,
  }
}
