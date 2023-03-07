import { useGetTransactionUsecase } from '@/data/transaction/usecases/GetTransactionUsecase'
import {
  GetTransactionInput,
  GetTransactionResult,
} from '@/domain/transaction/repositories/TransactionRepository'

export const useGetTransactionViewModel = (
  input?: GetTransactionInput,
): GetTransactionResult => {
  const result = useGetTransactionUsecase(input)

  return result
}
