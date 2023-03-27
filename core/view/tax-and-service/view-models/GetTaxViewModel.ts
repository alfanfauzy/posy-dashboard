import { UseQueryOptions } from '@tanstack/react-query'

import { GetTaxDataResponse } from '@/data/tax/types'
import { useGetTaxUsecase } from '@/data/tax/usecases/GetTaxUsecase'
import {
  GetTaxInput,
  GetTaxResult,
} from '@/domain/tax/repositories/TaxRepository'
import { Response } from '@/domain/vo/BaseResponse'

export const useGetTaxViewModel = (
  input: GetTaxInput,
  options?: UseQueryOptions<Response<GetTaxDataResponse>>,
): GetTaxResult => {
  const result = useGetTaxUsecase(input, options)

  return result
}
