import { UseMutationResult, UseQueryResult } from '@tanstack/react-query'

export type Response<TData = unknown> = {
  code: number
  data: TData
  message: string
  more_info: string
}

export type ResultQuery<TData = unknown, TError = unknown> = Omit<
  UseQueryResult<unknown, TError>,
  'data'
> & {
  data: TData
}

export type ResultMutation<
  TData = unknown,
  TError = unknown,
  TVariables = unknown,
> = Omit<
  UseMutationResult<unknown, TError, TVariables>,
  'data' | 'mutate' | 'mutateAsync'
> & {
  data: TData
}

export type DataList<TData> = {
  curr_page: number
  total_page: number
  total_objs: number
  per_page: number
  objs: TData[]
}
