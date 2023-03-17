import { UseQueryOptions } from '@tanstack/react-query'

import { GetOutletSelectionResult } from '@/domain/outlet/repositories/OutletRepository'
import { DataList, Response } from '@/domain/vo/BaseResponse'

import { mapToOutletSelectionModel } from '../mappers/OutletMapper'
import { useGetOutletSelectionQuery } from '../sources/GetOutletSelectionQuery'
import { GetOutletSelectionDataResponse } from '../types'

export const useGetOutletSelectionUsecase = (
  options?: UseQueryOptions<Response<DataList<GetOutletSelectionDataResponse>>>,
): GetOutletSelectionResult => {
  const { data, ...rest } = useGetOutletSelectionQuery(options)

  if (data?.data?.objs) {
    const dataMapper = mapToOutletSelectionModel(data.data.objs)

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
