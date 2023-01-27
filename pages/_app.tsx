import { useState } from 'react'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Layout from '@/organisms/layout'
import AuthLayout from '@/organisms/layout/auth-layout'
import '../styles/globals.css'

const App = ({ Component, pageProps }: AppProps) => {
  const [queryClient] = useState(new QueryClient())
  const authData = 'ada'

  if (!authData) {
    return (
      <AuthLayout>
        <Component {...pageProps} />
      </AuthLayout>
    )
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default App
