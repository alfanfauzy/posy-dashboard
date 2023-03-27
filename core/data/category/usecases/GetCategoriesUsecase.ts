/* eslint-disable no-unsafe-optional-chaining */
import { UseQueryOptions } from '@tanstack/react-query'

import {
  GetCategoriesInput,
  GetCategoriesResult,
} from '@/domain/category/repositories/CategoryRepository'
import { DataList, Response } from '@/domain/vo/BaseResponse'

import { mapToCategoriesModel } from '../mappers/CategoryMapper'
import { useGetCategoriesQuery } from '../sources/GetCategoriesQuery'
import { GetCategoriesDataResponse } from '../types'

export const useGetCategoriesUsecase = (
  input?: GetCategoriesInput,
  options?: UseQueryOptions<Response<DataList<GetCategoriesDataResponse>>>,
): GetCategoriesResult => {
  const { data, ...rest } = useGetCategoriesQuery(input, options)

  if (data?.data?.objs) {
    const defaultData = [
      { uuid: '', category_name: 'All', is_active: true, restaurant_uuid: '' },
      ...data?.data.objs,
    ]

    const dataMapper = mapToCategoriesModel(defaultData)

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
