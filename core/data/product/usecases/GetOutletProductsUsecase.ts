import { UseQueryOptions } from '@tanstack/react-query'

import {
  GetOutletProductsInput,
  GetOutletProductsResult,
} from '@/domain/product/repositories/ProductRepository'
import { DataList, Response } from '@/domain/vo/BaseResponse'

import { mapToOutletProductsModel } from '../mappers/ProductMapper'
import { useGetOutletProductsQuery } from '../sources/GetOutletProductsQuery'
import { GetOutletProductsDataResponse } from '../types/OutletProduct'

export const useGetOutletProductsUsecase = (
  input: GetOutletProductsInput,
  options?: UseQueryOptions<Response<DataList<GetOutletProductsDataResponse>>>,
): GetOutletProductsResult => {
  const { data, ...rest } = useGetOutletProductsQuery(input, options)

  if (data?.data?.objs) {
    const dataMapper = mapToOutletProductsModel(data.data.objs)

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
