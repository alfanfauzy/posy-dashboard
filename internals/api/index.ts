import axios, { AxiosError, AxiosResponse } from 'axios'

import { store } from '@/store/index'

// Set config defaults when creating the instance

const { token } = store.getState().auth.authData

const instance = axios.create({
  headers: {
    token,
  },
})

instance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => error.response,
)

export default instance
