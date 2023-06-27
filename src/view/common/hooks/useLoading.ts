import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';

export const useLoading = () => {
	const router = useRouter();

	const [loadingState, setLoadingState] = useState({
		isRouteChanging: false,
		loadingKey: 0,
	});

	useEffect(() => {
		const handleRouteChangeStart = () => {
			setLoadingState(prevState => ({
				...prevState,
				isRouteChanging: true,
				// eslint-disable-next-line no-bitwise
				loadingKey: prevState.loadingKey ^ 1,
			}));
		};

		const handleRouteChangeEnd = () => {
			setLoadingState(prevState => ({
				...prevState,
				isRouteChanging: false,
			}));
		};

		router.events.on('routeChangeStart', handleRouteChangeStart);
		router.events.on('routeChangeComplete', handleRouteChangeEnd);
		router.events.on('routeChangeError', handleRouteChangeEnd);

		return () => {
			router.events.off('routeChangeStart', handleRouteChangeStart);
			router.events.off('routeChangeComplete', handleRouteChangeEnd);
			router.events.off('routeChangeError', handleRouteChangeEnd);
		};
	}, [router.events]);

	return {loadingState};
};
