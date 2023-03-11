interface LoginBased {
  uuid: string
  token: string
  refresh_token: string
  expired_at: number
}

export type Login = LoginBased
