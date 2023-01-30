import { useEffect, useState } from 'react'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AuthLayout from '@/organisms/layout/auth-layout'
import Layout from '@/organisms/layout'
import '../styles/globals.css'

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter()
  const [queryClient] = useState(new QueryClient())
  const authData = null

  useEffect(() => {
    if (authData) router.replace('/transaction')
    router.replace('/auth/login')
  }, [authData, router])

  return (
    <QueryClientProvider client={queryClient}>
      {!authData ? (
        <AuthLayout>
          <Component {...pageProps} />
        </AuthLayout>
      ) : (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      )}
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default App
