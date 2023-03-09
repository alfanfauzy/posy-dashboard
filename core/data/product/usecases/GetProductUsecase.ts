import { UseQueryOptions } from '@tanstack/react-query'

import {
  GetProductInput,
  GetProductResult,
} from '@/domain/product/repositories/ProductRepository'
import { Response } from '@/domain/vo/BaseResponse'

import { mapToProductModel } from '../mappers/ProductMapper'
import { useGetProductQuery } from '../sources/GetProductQuery'
import { GetProductDataResponse } from '../types'

export const useGetProductUsecase = (
  input: GetProductInput,
  options?: UseQueryOptions<Response<GetProductDataResponse>>,
): GetProductResult => {
  const { data, ...rest } = useGetProductQuery(input, options)

  if (data?.data) {
    const dataMapper = mapToProductModel(data.data)

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
