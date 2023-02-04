import Post from 'api/post'

export const login = async () => {
  const response = await Post({
    endpoint: `${process.env.NEXT_PUBLIC_API}/order/transaction/create`,
    data: {},
  })

  return {
    status: response?.code,
    data: response?.payload || [],
    message: response?.message,
  }
}
