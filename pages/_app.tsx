/* eslint-disable react-hooks/exhaustive-deps */
import 'posy-fnb-core/dist/index.css'
import 'posy-fnb-core/dist/style.css'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import '../styles/globals.css'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { Suspense, useEffect, useState } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import ModalWrapper from '@/atoms/modal'
import { UNPROTECT_ROUTES } from '@/config/link'
import { persistor, wrapper } from '@/store/index'
import Layout from '@/templates/layout'
import type { NextPageWithLayout } from '@/types/index'
import { GetSubscriptionSectionServerViewModel } from '@/view/subscription/view-models/GetSubscriptionSectionViewModel'

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const App = ({ Component, pageProps, ...rest }: AppPropsWithLayout) => {
  const [queryClient] = useState(new QueryClient())
  const { store } = wrapper.useWrappedStore(rest)
  const { push, asPath } = useRouter()

  useEffect(() => {
    if (!pageProps.isSubscription && !UNPROTECT_ROUTES.includes(asPath)) {
      push('/settings/subscription')
    }
  }, [pageProps])

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
          <ModalWrapper />
          {getLayout(<Component {...pageProps} />)}
        </PersistGate>
      </Provider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

App.getInitialProps = async () => {
  const data = await GetSubscriptionSectionServerViewModel()

  return {
    pageProps: {
      ...data,
    },
  }
}

export default App
