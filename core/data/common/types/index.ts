import { UseMutationOptions, UseQueryOptions } from '@tanstack/react-query'

import { Response } from '@/domain/vo/BaseResponse'

export type MutationOptions<TData, TVariables = unknown> = UseMutationOptions<
  Response<TData>,
  unknown,
  TVariables,
  unknown
>

export type QueryOptions = Omit<
  UseQueryOptions<unknown, unknown, unknown, string[]>,
  'queryKey' | 'queryFn' | 'initialData'
> & {
  initialData?: () => undefined
}
