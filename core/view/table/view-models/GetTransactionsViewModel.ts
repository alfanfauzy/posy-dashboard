import { UseQueryOptions } from '@tanstack/react-query'

import { GetTablesDataResponse } from '@/data/table/types'
import { useGetTablesUsecase } from '@/data/table/usecases/GetTablesUsecase'
import {
  GetTablesInput,
  GetTablesResult,
} from '@/domain/table/repositories/TableRepository'
import { DataList, Response } from '@/domain/vo/BaseResponse'

export const useGetTablesViewModel = (
  input?: GetTablesInput,
  options?: UseQueryOptions<Response<DataList<GetTablesDataResponse>>>,
): GetTablesResult => {
  const result = useGetTablesUsecase(input, options)

  return result
}
