import { UseQueryOptions } from '@tanstack/react-query'

import { GetCategoriesDataResponse } from '@/data/category/types'
import { useGetCategoriesUsecase } from '@/data/category/usecases/GetCategoriesUsecase'
import {
  GetCategoriesInput,
  GetCategoriesResult,
} from '@/domain/category/repositories/CategoryRepository'
import { DataList, Response } from '@/domain/vo/BaseResponse'

export const useGetCategoriesViewModel = (
  input?: GetCategoriesInput,
  options?: UseQueryOptions<Response<DataList<GetCategoriesDataResponse>>>,
): GetCategoriesResult => {
  const result = useGetCategoriesUsecase(input, options)

  return result
}
