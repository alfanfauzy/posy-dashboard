import Get from 'api/get'
import Post from 'api/post'

export const getListTransaction = async () => {
  const response = await Get({
    endpoint: `${process.env.NEXT_PUBLIC_API}/order/transaction/get-list`,
  })

  return {
    status: response?.code,
    data: response?.payload || [],
    message: response?.message,
  }
}

export const createTransaction = async () => {
  const response = await Post({
    // endpoint: `${process.env.NEXT_PUBLIC_API}/order/transaction/create`,
    endpoint: `http://localhost:9994/api/hello`,
    data: {},
  })

  return {
    status: response?.code,
    data: response?.payload || [],
    message: response?.message,
  }
}
