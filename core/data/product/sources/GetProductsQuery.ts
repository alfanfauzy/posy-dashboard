import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import Get from 'api/get'

import { GetProductsInput } from '@/domain/product/repositories/ProductRepository'
import { DataList, Response } from '@/domain/vo/BaseResponse'

import { GetProductsDataResponse } from '../types'

export const GetProductsQueryKey = (input?: GetProductsInput) =>
  ['Products/list', input] as const

const GetProducts = async (
  input: GetProductsInput,
): Promise<Response<DataList<GetProductsDataResponse>>> => {
  const response = await Get({
    endpoint: `/api/fnb-product-service/product/get-menu-product-list`,
    data: input,
  })

  return {
    code: response?.code,
    data: response?.data as any,
    message: response?.message,
    more_info: response?.more_info,
  }
}

export const useGetProductsQuery = (
  input: GetProductsInput,
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
