import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import Get from 'api/get'

import { GetCategoriesInput } from '@/domain/category/repositories/CategoryRepository'
import { Response } from '@/domain/vo/BaseResponse'

import { GetCategoriesDataResponse } from '../types'

export const GetCategoriesQueryKey = () => ['Categories/list'] as const

const GetCategories = async (
  input?: GetCategoriesInput,
): Promise<Response<GetCategoriesDataResponse[]>> => {
  const response = await Get({
    endpoint: `/api/fnb-product-service/menu/get-category-list`,
    headers: {
      'X-Transaction-Uuid': '6361d2ec-6ebf-4910-bee0-3732c266286f',
    },
  })

  return {
    code: response?.code,
    data: response?.data as any,
    message: response?.message,
    more_info: response?.more_info,
  }
}

export const useGetCategoriesQuery = (
  input?: GetCategoriesInput,
  options?: UseQueryOptions<Response<GetCategoriesDataResponse[]>>,
) =>
  useQuery<Response<GetCategoriesDataResponse[]>>(
    GetCategoriesQueryKey(),
    () => GetCategories(input),
    {
      refetchOnWindowFocus: false,
      ...options,
    },
  )