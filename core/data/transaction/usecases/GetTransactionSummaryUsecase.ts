import { UseQueryOptions } from '@tanstack/react-query'

import {
  GetTransactionSummaryInput,
  GetTransactionSummaryResult,
} from '@/domain/transaction/repositories/TransactionRepository'
import { Response } from '@/domain/vo/BaseResponse'

import { mapToTransactionSummaryModel } from '../mappers/TransactionMapper'
import { useGetTransactionSummaryQuery } from '../sources/GetTransactionSummaryQuery'
import { GetTransactionSummaryDataResponse } from '../types'

export const useGetTransactionSummaryUsecase = (
  input?: GetTransactionSummaryInput,
  options?: UseQueryOptions<Response<GetTransactionSummaryDataResponse>>,
): GetTransactionSummaryResult => {
  const { data, ...rest } = useGetTransactionSummaryQuery(input, options)

  if (data?.data) {
    const dataMapper = mapToTransactionSummaryModel(data.data)

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
