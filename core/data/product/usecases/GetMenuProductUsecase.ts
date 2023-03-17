import { UseQueryOptions } from '@tanstack/react-query'

import {
  GetMenuProductInput,
  GetMenuProductResult,
} from '@/domain/product/repositories/ProductRepository'
import { Response } from '@/domain/vo/BaseResponse'

import { mapToMenuProductModel } from '../mappers/ProductMapper'
import { useGetMenuProductQuery } from '../sources/GetMenuProductQuery'
import { GetMenuProductDataResponse } from '../types'

export const useGetMenuProductUsecase = (
  input: GetMenuProductInput,
  options?: UseQueryOptions<Response<GetMenuProductDataResponse>>,
): GetMenuProductResult => {
  const { data, ...rest } = useGetMenuProductQuery(input, options)

  if (data?.data) {
    const dataMapper = mapToMenuProductModel(data.data)

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
