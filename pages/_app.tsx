import 'posy-fnb-core/dist/index.css';
import 'posy-fnb-core/dist/style.css';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import '@/view/common/styles/globals.css';

import {AbilityProvider} from '@/view/auth/components/organisms/rbac';
import Loadingbar from '@/view/common/components/atoms/loading/loading-bar';
import ModalWrapper from '@/view/common/components/atoms/modal';
import DashboardLayout from '@/view/common/components/templates/layout/dashboard-layout';
import {useLoading} from '@/view/common/hooks/useLoading';
import {persistor, wrapper} from '@/view/common/store/index';
import type {NextPageWithLayout} from '@/view/common/types/index';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import {AxiosError} from 'axios';
import type {AppProps} from 'next/app';
import {SnackbarProvider} from 'notistack';
import {Suspense, useState} from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout;
};

const App = ({Component, pageProps, ...rest}: AppPropsWithLayout) => {
	const [queryClient] = useState(
		new QueryClient({
			defaultOptions: {
				queries: {
					retry(failureCount, error) {
						const err = error as AxiosError;
						if (Number(err.code) === 500) {
							return failureCount < 3;
						}
						return false;
					},
				},
			},
		}),
	);
	const {store} = wrapper.useWrappedStore(rest);
	const {loadingState} = useLoading();

	const getLayout =
		Component.getLayout ??
		(page => (
			<Suspense fallback={page}>
				<DashboardLayout>{page}</DashboardLayout>
			</Suspense>
		));

	return (
		<QueryClientProvider client={queryClient}>
			<SnackbarProvider
				maxSnack={3}
				autoHideDuration={2000}
				transitionDuration={500}
				anchorOrigin={{horizontal: 'center', vertical: 'top'}}
			>
				<Provider store={store}>
					<AbilityProvider>
						<PersistGate persistor={persistor}>
							<Loadingbar
								isRouteChanging={loadingState.isRouteChanging}
								key={loadingState.loadingKey}
							/>
							<ModalWrapper />
							{getLayout(<Component {...pageProps} />)}
						</PersistGate>
					</AbilityProvider>
				</Provider>
			</SnackbarProvider>
			<ReactQueryDevtools />
		</QueryClientProvider>
	);
};

export default App;
