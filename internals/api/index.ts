import 'regenerator-runtime/runtime.js'

import axios, { AxiosError, AxiosResponse } from 'axios'

import { store } from '@/store/index'

// Set config defaults when creating the instance

const instance = axios.create({
  headers: {
    token: store.getState().auth.authData.token,
  },
})

instance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => error.response,
)

export default instance
