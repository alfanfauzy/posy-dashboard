import { UseQueryOptions } from '@tanstack/react-query'

import {
  GetTransactionsInput,
  GetTransactionsResult,
} from '@/domain/transaction/repositories/TransactionRepository'
import { DataList, Response } from '@/domain/vo/BaseResponse'

import { mapToTransactionsModel } from '../mappers/TransactionMapper'
import { useGetTransactionsQuery } from '../sources/GetTransactionsQuery'
import { GetTransactionsDataResponse } from '../types'

export const useGetTransactionsUsecase = (
  input?: GetTransactionsInput,
  options?: UseQueryOptions<Response<DataList<GetTransactionsDataResponse>>>,
): GetTransactionsResult => {
  const { data, ...rest } = useGetTransactionsQuery(input, options)

  if (data?.data?.objs) {
    const dataMapper = mapToTransactionsModel(data.data.objs)

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
