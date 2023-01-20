import type { AppProps } from 'next/app'
import Layout from '@/organisms/layout'
import AuthLayout from '@/organisms/layout/auth-layout'
import '../styles/globals.css'

const App = ({ Component, pageProps }: AppProps) => {
  const authData = 'ada'

  if (!authData) {
    return (
      <AuthLayout>
        <Component {...pageProps} />
      </AuthLayout>
    )
  }

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default App
