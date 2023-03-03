import { useGetTransactionsUsecase } from '@/data/transaction/usecases/GetTransactionsUsecase'
import {
  GetTransactionsInput,
  GetTransactionsResult,
} from '@/domain/transaction/repositories/TransactionRepository'

export const useGetTransactionsViewModel = (
  input?: GetTransactionsInput,
): GetTransactionsResult => {
  const result = useGetTransactionsUsecase(input)

  return result
}
