import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import Get from 'api/get'

import { GetProductsInput } from '@/domain/product/repositories/ProductRepository'
import { DataList, Response } from '@/domain/vo/BaseResponse'

import { GetProductsDataResponse } from '../types'

export const GetProductsQueryKey = (input?: GetProductsInput) =>
  ['Products/list', input] as const

const GetProducts = async (
  input?: GetProductsInput,
): Promise<Response<DataList<GetProductsDataResponse>>> => {
  const response = await Get({
    endpoint: `/api/fnb-product-service/menu/get-product-list`,
    headers: {
      'X-Transaction-Uuid': '6361d2ec-6ebf-4910-bee0-3732c266286f',
    },
    // data: input,
  })

  return {
    code: response?.code,
    data: response?.data as any,
    message: response?.message,
    more_info: response?.more_info,
  }
}

export const useGetProductsQuery = (
  input?: GetProductsInput,
  options?: UseQueryOptions<Response<DataList<GetProductsDataResponse>>>,
) =>
  useQuery<Response<DataList<GetProductsDataResponse>>>(
    GetProductsQueryKey(input),
    () => GetProducts(input),
    {
      refetchOnWindowFocus: false,
      ...options,
    },
  )
