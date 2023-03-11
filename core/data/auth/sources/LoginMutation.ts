import { useMutation } from '@tanstack/react-query'
import Post from 'api/post'

import { MutationOptions } from '@/data/common/types'
import { LoginInput } from '@/domain/auth/repositories/AuthRepository'
import { Response } from '@/domain/vo/BaseResponse'

import { LoginDataResponse } from '../types'

const Login = async (
  input: LoginInput,
): Promise<Response<LoginDataResponse>> => {
  const response = await Post({
    endpoint: `/api/fnb-user-service/v1/user/login`,
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

export const useLoginMutation = (
  options?: MutationOptions<LoginDataResponse>,
) =>
  useMutation({
    mutationFn: (input: LoginInput) => Login(input),
    ...options,
  })
