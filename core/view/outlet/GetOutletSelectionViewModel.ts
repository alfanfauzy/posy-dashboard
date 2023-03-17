import { UseQueryOptions } from '@tanstack/react-query'

import { GetOutletSelectionDataResponse } from '@/data/outlet/types'
import { useGetOutletSelectionUsecase } from '@/data/outlet/usecases/GetOutletSelectionUsecase'
import { GetOutletSelectionResult } from '@/domain/outlet/repositories/OutletRepository'
import { DataList, Response } from '@/domain/vo/BaseResponse'

export const useGetOutletSelectionViewModel = (
  options?: UseQueryOptions<Response<DataList<GetOutletSelectionDataResponse>>>,
): GetOutletSelectionResult => {
  const result = useGetOutletSelectionUsecase(options)

  return result
}
