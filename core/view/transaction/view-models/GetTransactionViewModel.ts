import { UseQueryOptions } from '@tanstack/react-query'

import { GetTransactionDataResponse } from '@/data/transaction/types'
import { useGetTransactionUsecase } from '@/data/transaction/usecases/GetTransactionUsecase'
import {
  GetTransactionInput,
  GetTransactionResult,
} from '@/domain/transaction/repositories/TransactionRepository'
import { Response } from '@/domain/vo/BaseResponse'

export const useGetTransactionViewModel = (
  input: GetTransactionInput,
  options?: UseQueryOptions<Response<GetTransactionDataResponse>>,
): GetTransactionResult => {
  const result = useGetTransactionUsecase(input, options)

  return result
}
