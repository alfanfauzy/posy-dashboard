import { MutationOptions } from '@/data/common/types'
import {
  LoginInput,
  LoginRepository,
} from '@/domain/auth/repositories/AuthRepository'

import { mapToLoginModel } from '../mappers/LoginMapper'
import { useLoginMutation } from '../sources/LoginMutation'
import { LoginDataResponse } from '../types'

export const useLoginUsecase = (
  options?: MutationOptions<LoginDataResponse>,
): LoginRepository => {
  const { mutate, data, ...rest } = useLoginMutation(options)

  const login = (input: LoginInput) => {
    mutate(input)
  }

  if (data?.data) {
    return {
      login,
      data: mapToLoginModel(data?.data),
      ...rest,
    }
  }

  return {
    login,
    data: undefined,
    ...rest,
  }
}
