import type { AppProps } from 'next/app'
import { Suspense, useState } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { persistor, wrapper } from 'store/index'
import Layout from '@/templates/layout'
import type { NextPageWithLayout } from '@/types/index'
import 'posy-fnb-core/dist/index.css'
import '../styles/globals.css'

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const App = ({ Component, pageProps, ...rest }: AppPropsWithLayout) => {
  const [queryClient] = useState(new QueryClient())
  const { store } = wrapper.useWrappedStore(rest)

  const getLayout =
    Component.getLayout ??
    ((page) => (
      <Suspense fallback={page}>
        <Layout>{page}</Layout>
      </Suspense>
    ))

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          {getLayout(<Component {...pageProps} />)}
        </PersistGate>
      </Provider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default App
