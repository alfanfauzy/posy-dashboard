export interface LoginDataResponse {
  uuid: string
  token: string
  refresh_token: string
  expired_at: {
    seconds: number
    nanos: number
  }
}
