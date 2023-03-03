import {
  GetTransactionsInput,
  GetTransactionsResult,
} from '@/domain/transaction/repositories/TransactionRepository'

import { mapToTransactionsModel } from '../mappers/TransactionMapper'
import { useGetTransactionsQuery } from '../sources/GetTransactionsQuery'

export const useGetTransactionsUsecase = (
  input?: GetTransactionsInput,
): GetTransactionsResult => {
  const { data, ...rest } = useGetTransactionsQuery(input)

  if (data?.data?.objs) {
    const dataMapper = mapToTransactionsModel(data.data?.objs)

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
