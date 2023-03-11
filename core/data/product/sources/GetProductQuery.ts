import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import Get from 'api/get'

import { GetProductInput } from '@/domain/product/repositories/ProductRepository'
import { Response } from '@/domain/vo/BaseResponse'

import { GetProductDataResponse } from '../types'

export const GetProductQueryKey = (input?: GetProductInput) =>
  ['Products/detail', input] as const

const GetProduct = async (
  input: GetProductInput,
): Promise<Response<GetProductDataResponse>> => {
  const response = await Get({
    endpoint: `/api/fnb-product-service/menu/get-product-detail/${input?.product_uuid}`,
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

export const useGetProductQuery = (
  input: GetProductInput,
  options?: UseQueryOptions<Response<GetProductDataResponse>>,
) =>
  useQuery<Response<GetProductDataResponse>>(
    GetProductQueryKey(input),
    () => GetProduct(input),
    {
      refetchOnWindowFocus: false,
      ...options,
    },
  )
