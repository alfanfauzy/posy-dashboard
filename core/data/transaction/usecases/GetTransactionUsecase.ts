import {
  GetTransactionInput,
  GetTransactionResult,
} from '@/domain/transaction/repositories/TransactionRepository'

import { mapToTransactionModel } from '../mappers/TransactionMapper'
import { useGetTransactionQuery } from '../sources/GetTransactionQuery'

export const useGetTransactionUsecase = (
  input?: GetTransactionInput,
): GetTransactionResult => {
  const { data, ...rest } = useGetTransactionQuery(input)

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
