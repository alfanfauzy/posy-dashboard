import { MutationOptions } from '@/data/common/types'
import {
  UpdateTransactionInput,
  UpdateTransactionRepository,
} from '@/domain/transaction/repositories/TransactionRepository'

import { mapToUpdateTransactionModel } from '../mappers/TransactionMapper'
import { useUpdateTransactionMutation } from '../sources/UpdateTransactionMutation'
import { UpdateTransactionDataResponse } from '../types'

export const useUpdateTransactionUsecase = (
  options?: MutationOptions<UpdateTransactionDataResponse>,
): UpdateTransactionRepository => {
  const { mutate, data, ...rest } = useUpdateTransactionMutation(options)

  const updateTransaction = (input: UpdateTransactionInput) => {
    mutate(input)
  }

  if (data?.data) {
    return {
      updateTransaction,
      data: mapToUpdateTransactionModel(data?.data),
      ...rest,
    }
  }

  return {
    updateTransaction,
    data: undefined,
    ...rest,
  }
}
