import { MutationOptions } from '@/data/common/types'
import { CreateTransactionRepository } from '@/domain/transaction/repositories/TransactionRepository'

import { mapToCreateTransactionModel } from '../mappers/TransactionMapper'
import { useCreateTransactionMutation } from '../sources/CreateTransactionMutation'
import { CreateTransactionDataResponse } from '../types'

export const useCreateTransaction = (
  options?: MutationOptions<CreateTransactionDataResponse>,
): CreateTransactionRepository => {
  const { mutate, data, ...rest } = useCreateTransactionMutation(options)

  const createTransaction = () => {
    mutate({})
  }

  if (data?.data) {
    return {
      createTransaction,
      data: mapToCreateTransactionModel(data?.data),
      ...rest,
    }
  }

  return {
    createTransaction,
    data: undefined,
    ...rest,
  }
}