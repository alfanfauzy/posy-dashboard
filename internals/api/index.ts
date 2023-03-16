import 'regenerator-runtime/runtime.js'

import axios, { AxiosError, AxiosResponse } from 'axios'

// Set config defaults when creating the instance

const instance = axios.create()

instance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => error.response,
)

export default instance
