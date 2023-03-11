import { Login } from '@/domain/auth/model'
import { ResultMutation } from '@/domain/vo/BaseResponse'

/**
 * POST
 */

export type LoginInput = {
  email: string
  password: string
}

export type LoginResult = ResultMutation<Login | undefined>

export interface LoginRepository extends LoginResult {
  login(input: LoginInput): void
}
