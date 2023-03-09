import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import Post from 'api/post'

import { GetProductsInput } from '@/domain/product/repositories/ProductRepository'
import { DataList, Response } from '@/domain/vo/BaseResponse'

import { GetProductsDataResponse } from '../types'

export const GetProductsQueryKey = (input?: GetProductsInput) =>
  ['Products/list', input] as const

export const GetProducts = async (
  input?: GetProductsInput,
): Promise<Response<DataList<GetProductsDataResponse>>> => {
  const response = await Post({
    endpoint: `/api/fnb-product-service/product-outlet/get-list`,
    headers: {
      token: process.env.NEXT_PUBLIC_TOKEN || '',
    },
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
