import { UseQueryOptions } from '@tanstack/react-query'

import {
  GetTablesInput,
  GetTablesResult,
} from '@/domain/table/repositories/TableRepository'
import { DataList, Response } from '@/domain/vo/BaseResponse'

import { mapToTablesModel } from '../mappers/TableMapper'
import { useGetTablesQuery } from '../sources/GetTablesQuery'
import { GetTablesDataResponse } from '../types'

export const useGetTablesUsecase = (
  input?: GetTablesInput,
  options?: UseQueryOptions<Response<DataList<GetTablesDataResponse>>>,
): GetTablesResult => {
  const { data, ...rest } = useGetTablesQuery(input, options)

  if (data?.data?.objs) {
    const dataMapper = mapToTablesModel(data.data.objs)

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
