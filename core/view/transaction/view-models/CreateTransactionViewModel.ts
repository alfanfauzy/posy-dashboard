import { MutationOptions } from '@/data/common/types'
import { CreateTransactionDataResponse } from '@/data/transaction/types'
import { useCreateTransaction } from '@/data/transaction/usecases/CreateTransactionUsecase'
import { CreateTransactionRepository } from '@/domain/transaction/repositories/TransactionRepository'

export const useCreateTransactionViewModel = (
  options?: MutationOptions<CreateTransactionDataResponse>,
): CreateTransactionRepository => {
  const result = useCreateTransaction(options)

  return result
}
