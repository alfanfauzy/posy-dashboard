import { UseQueryOptions } from '@tanstack/react-query'

import {
  GetTransactionInput,
  GetTransactionResult,
} from '@/domain/transaction/repositories/TransactionRepository'
import { Response } from '@/domain/vo/BaseResponse'

import { mapToTransactionModel } from '../mappers/TransactionMapper'
import { useGetTransactionQuery } from '../sources/GetTransactionQuery'
import { GetTransactionDataResponse } from '../types'

export const useGetTransactionUsecase = (
  input: GetTransactionInput,
  options?: UseQueryOptions<Response<GetTransactionDataResponse>>,
): GetTransactionResult => {
  const { data, ...rest } = useGetTransactionQuery(input, options)

  if (data?.data) {
    const dataMapper = mapToTransactionModel(data.data)

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
