import { UseMutationOptions } from '@tanstack/react-query'

import { Response } from '@/domain/vo/BaseResponse'

export type MutationOptions<TData, TVariables = unknown> = UseMutationOptions<
  Response<TData>,
  unknown,
  TVariables,
  unknown
>
