import { UseQueryOptions } from '@tanstack/react-query'

import { GetProductDataResponse } from '@/data/product/types'
import { useGetProductUsecase } from '@/data/product/usecases/GetProductUsecase'
import {
  GetProductInput,
  GetProductResult,
} from '@/domain/product/repositories/ProductRepository'
import { Response } from '@/domain/vo/BaseResponse'

export const useGetProductViewModel = (
  input: GetProductInput,
  options?: UseQueryOptions<Response<GetProductDataResponse>>,
): GetProductResult => {
  const result = useGetProductUsecase(input, options)

  return result
}
