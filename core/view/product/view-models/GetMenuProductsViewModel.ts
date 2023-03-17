import { UseQueryOptions } from '@tanstack/react-query'

import { GetMenuProductsDataResponse } from '@/data/product/types'
import { useGetMenuProductsUsecase } from '@/data/product/usecases/GetMenuProductsUsecase'
import {
  GetMenuProductsInput,
  GetMenuProductsResult,
} from '@/domain/product/repositories/ProductRepository'
import { DataList, Response } from '@/domain/vo/BaseResponse'

export const useGetMenuProductsViewModel = (
  input: GetMenuProductsInput,
  options?: UseQueryOptions<Response<DataList<GetMenuProductsDataResponse>>>,
): GetMenuProductsResult => {
  const result = useGetMenuProductsUsecase(input, options)

  return result
}
