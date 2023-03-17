import { UseQueryOptions } from '@tanstack/react-query'

import {
  GetProductsInput,
  GetProductsResult,
} from '@/domain/product/repositories/ProductRepository'
import { DataList, Response } from '@/domain/vo/BaseResponse'

import { mapToProductsModel } from '../mappers/ProductMapper'
import { useGetProductsQuery } from '../sources/GetProductsQuery'
import { GetProductsDataResponse } from '../types'

export const useGetProductsUsecase = (
  input: GetProductsInput,
  options?: UseQueryOptions<Response<DataList<GetProductsDataResponse>>>,
): GetProductsResult => {
  const { data, ...rest } = useGetProductsQuery(input, options)

  if (data?.data?.objs) {
    const dataMapper = mapToProductsModel(data.data.objs)

    return {
      data: dataMapper,
      pagination: {
        curr_page: data.data.curr_page,
        per_page: data.data.per_page,
        total_objs: data.data.total_objs,
        total_page: data.data.total_page,
      },
      ...rest,
    }
  }

  return {
    data: undefined,
    pagination: undefined,
    ...rest,
  }
}
