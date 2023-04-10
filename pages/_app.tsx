import 'posy-fnb-core/dist/index.css';
import 'posy-fnb-core/dist/style.css';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import '@/view/common/styles/globals.css';

import ModalWrapper from '@/view/common/components/atoms/modal';
import Layout from '@/view/common/components/templates/layout';
import {persistor, wrapper} from '@/view/common/store/index';
import type {NextPageWithLayout} from '@/view/common/types/index';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import type {AppProps} from 'next/app';
import {SnackbarProvider} from 'notistack';
import {Suspense, useState} from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout;
};

const App = ({Component, pageProps, ...rest}: AppPropsWithLayout) => {
	const [queryClient] = useState(new QueryClient());
	const {store} = wrapper.useWrappedStore(rest);

	const getLayout =
		Component.getLayout ??
		(page => (
			<Suspense fallback={page}>
				<Layout>{page}</Layout>
			</Suspense>
		));

	return (
		<QueryClientProvider client={queryClient}>
			<SnackbarProvider
				maxSnack={3}
				autoHideDuration={1500}
				anchorOrigin={{horizontal: 'center', vertical: 'top'}}
			>
				<Provider store={store}>
					<PersistGate persistor={persistor}>
						<ModalWrapper />
						{getLayout(<Component {...pageProps} />)}
					</PersistGate>
				</Provider>
			</SnackbarProvider>
			<ReactQueryDevtools />
		</QueryClientProvider>
	);
};

export default App;
