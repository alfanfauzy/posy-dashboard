import { UseQueryOptions } from '@tanstack/react-query'

import { GetMenuProductDataResponse } from '@/data/product/types'
import { useGetMenuProductUsecase } from '@/data/product/usecases/GetMenuProductUsecase'
import {
  GetMenuProductInput,
  GetMenuProductResult,
} from '@/domain/product/repositories/ProductRepository'
import { Response } from '@/domain/vo/BaseResponse'

export const useGetMenuProductViewModel = (
  input: GetMenuProductInput,
  options?: UseQueryOptions<Response<GetMenuProductDataResponse>>,
): GetMenuProductResult => {
  const result = useGetMenuProductUsecase(input, options)

  return result
}
