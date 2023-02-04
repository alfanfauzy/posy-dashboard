import type { AppProps } from 'next/app'
import { Suspense, useState } from 'react'
import withRedux from 'next-redux-wrapper'
import { PersistGate } from 'redux-persist/integration/react'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { store, persistor } from 'store/index'
import Layout from '@/templates/layout'
import type { NextPageWithLayout } from '@/types/index'
import 'posy-fnb-core/dist/index.css'
import '../styles/globals.css'

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const [queryClient] = useState(new QueryClient())

  const getLayout =
    Component.getLayout ??
    ((page) => (
      <Suspense fallback={page}>
        <Layout>{page}</Layout>
      </Suspense>
    ))

  return (
    <QueryClientProvider client={queryClient}>
      <PersistGate persistor={persistor}>
        {getLayout(<Component {...pageProps} />)}
      </PersistGate>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

const makeStore = () => store
export default withRedux(makeStore)(App)
