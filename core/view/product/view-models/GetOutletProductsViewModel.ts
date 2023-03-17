import { UseQueryOptions } from '@tanstack/react-query'

import { GetOutletProductsDataResponse } from '@/data/product/types/OutletProduct'
import { useGetOutletProductsUsecase } from '@/data/product/usecases/GetOutletProductsUsecase'
import {
  GetOutletProductsInput,
  GetOutletProductsResult,
} from '@/domain/product/repositories/ProductRepository'
import { DataList, Response } from '@/domain/vo/BaseResponse'

export const useGetOutletProductsViewModel = (
  input: GetOutletProductsInput,
  options?: UseQueryOptions<Response<DataList<GetOutletProductsDataResponse>>>,
): GetOutletProductsResult => {
  const result = useGetOutletProductsUsecase(input, options)

  return result
}
