import { UseQueryOptions } from '@tanstack/react-query'

import { GetProductsDataResponse } from '@/data/product/types'
import { useGetProductsUsecase } from '@/data/product/usecases/GetProductsUsecase'
import {
  GetProductsInput,
  GetProductsResult,
} from '@/domain/product/repositories/ProductRepository'
import { DataList, Response } from '@/domain/vo/BaseResponse'

export const useGetProductsViewModel = (
  input: GetProductsInput,
  options?: UseQueryOptions<Response<DataList<GetProductsDataResponse>>>,
): GetProductsResult => {
  const result = useGetProductsUsecase(input, options)

  return result
}
