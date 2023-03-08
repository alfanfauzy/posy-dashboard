import { UseQueryOptions } from '@tanstack/react-query'

import { GetTransactionsDataResponse } from '@/data/transaction/types'
import { useGetTransactionsUsecase } from '@/data/transaction/usecases/GetTransactionsUsecase'
import {
  GetTransactionsInput,
  GetTransactionsResult,
} from '@/domain/transaction/repositories/TransactionRepository'
import { DataList, Response } from '@/domain/vo/BaseResponse'

export const useGetTransactionsViewModel = (
  input?: GetTransactionsInput,
  options?: UseQueryOptions<Response<DataList<GetTransactionsDataResponse>>>,
): GetTransactionsResult => {
  const result = useGetTransactionsUsecase(input, options)

  return result
}
