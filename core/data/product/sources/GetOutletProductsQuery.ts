import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import Post from 'api/post'

import { GetOutletProductsInput } from '@/domain/product/repositories/ProductRepository'
import { DataList, Response } from '@/domain/vo/BaseResponse'

import { GetOutletProductsDataResponse } from '../types/OutletProduct'

export const GetOutletProductsQueryKey = 'Outlet-products/list' as const

const GetOutletProducts = async (
  input: GetOutletProductsInput,
): Promise<Response<DataList<GetOutletProductsDataResponse>>> => {
  const response = await Post({
    endpoint: `/api/fnb-product-service/product-outlet/get-list`,
    data: input,
  })

  return {
    code: response?.code,
    data: response?.data as any,
    message: response?.message,
    more_info: response?.more_info,
  }
}

export const useGetOutletProductsQuery = (
  input: GetOutletProductsInput,
  options?: UseQueryOptions<Response<DataList<GetOutletProductsDataResponse>>>,
) =>
  useQuery<Response<DataList<GetOutletProductsDataResponse>>>(
    [GetOutletProductsQueryKey, input],
    () => GetOutletProducts(input),
    {
      refetchOnWindowFocus: false,
      ...options,
    },
  )
