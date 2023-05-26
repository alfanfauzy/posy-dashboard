/* eslint-disable react-hooks/exhaustive-deps */
import {GetOrdersQueryKey} from '@/data/order/sources/GetOrdersQuery';
import {GetTransactionsQueryKey} from '@/data/transaction/sources/GetTransactionsQuery';
import {GetTransactionSummaryQueryKey} from '@/data/transaction/sources/GetTransactionSummaryQuery';
import CancelIcon from '@/view/common/assets/icons/cancel';
import Transition from '@/view/common/components/atoms/animations/transition';
import Sidebar from '@/view/common/components/templates/sidebar';
import firebaseApp from '@/view/common/config/firebase';
import {UNPROTECT_ROUTES} from '@/view/common/config/link';
import {useAppDispatch, useAppSelector} from '@/view/common/store/hooks';
import {setIsSubscription} from '@/view/common/store/slices/auth';
import {useGetOutletSelectionViewModel} from '@/view/outlet/view-models/GetOutletSelectionViewModel';
import {useGetSubscriptionSectionViewModel} from '@/view/subscription/view-models/GetSubscriptionSectionViewModel';
import {useQueryClient} from '@tanstack/react-query';
import {getMessaging, onMessage} from 'firebase/messaging';
import {useRouter} from 'next/router';
import {closeSnackbar, useSnackbar} from 'notistack';
import {Loading} from 'posy-fnb-core';
import React, {ReactNode, useEffect, useRef, useState} from 'react';
import {ProSidebarProvider} from 'react-pro-sidebar';

type OrganismsLayoutProps = {
	children: ReactNode;
};

export const handlePlayAudio = (play: () => void) => {
	const button = document.createElement('button');
	button.addEventListener('click', play);
	button.click();
};

const OrganismsLayout = ({children}: OrganismsLayoutProps) => {
	const dispatch = useAppDispatch();
	const queryClient = useQueryClient();
	const {replace, asPath, pathname} = useRouter();
	const {isLoggedIn, isSubscription} = useAppSelector(state => state.auth);
	const [loading, setLoading] = useState(true);
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const audioRef = useRef<any>();
	const {enqueueSnackbar} = useSnackbar();

	const play = () => {
		if (audioRef.current) {
			audioRef.current.play();
		}
	};

	const {data: dataSubscription} = useGetSubscriptionSectionViewModel({
		queryKey: [pathname],
		enabled: isLoggedIn,
	});

	const {data: dataOutletSelection} = useGetOutletSelectionViewModel({
		enabled: isLoggedIn && isSubscription,
	});

	useEffect(() => {
		if (!isLoggedIn) replace('/auth/login');
		else if (
			dataSubscription &&
			dataSubscription.isSubscription &&
			asPath === '/'
		) {
			replace('/transaction');
			setTimeout(() => {
				setLoading(false);
			}, 500);
		} else if (
			dataSubscription &&
			!dataSubscription.isSubscription &&
			!UNPROTECT_ROUTES.includes(asPath)
		) {
			replace('/settings/subscription');
			setTimeout(() => {
				setLoading(false);
			}, 500);
		} else {
			setTimeout(() => {
				setLoading(false);
			}, 500);
		}
	}, [asPath, isLoggedIn, dataSubscription]);

	useEffect(() => {
		if (dataSubscription) {
			dispatch(setIsSubscription(dataSubscription.isSubscription));
		}
	}, [dataSubscription]);

	useEffect(() => {
		const messaging = getMessaging(firebaseApp);

		onMessage(messaging, message => {
			if (message.data) {
				handlePlayAudio(play);

				queryClient.invalidateQueries([GetTransactionsQueryKey]);
				queryClient.invalidateQueries([
					GetOrdersQueryKey,
					{transaction_uuid: message?.data.transaction_uuid},
				]);
				queryClient.invalidateQueries([GetTransactionSummaryQueryKey]);
				enqueueSnackbar({
					className: 'border-t-8 border-blue-success',
					style: {
						borderRadius: '8px',
						background: '#ffffff',
						color: '#0A0A0A',
					},
					action: snackbarId => (
						<div className="mr-2">
							<CancelIcon
								onClick={() => {
									closeSnackbar(snackbarId);
								}}
							/>
						</div>
					),
					autoHideDuration: 1000 * 10,
					message: message.data.content as string,
					variant: 'info',
					anchorOrigin: {
						horizontal: 'right',
						vertical: 'top',
					},
				});
			}
		});
	}, []);

	if (loading) {
		return (
			<main className="flex h-screen w-full items-center justify-center">
				<Loading size={100} />
			</main>
		);
	}

	return (
		<ProSidebarProvider>
			<main className="h-screen max-h-screen overflow-x-auto overflow-y-hidden bg-neutral-30 py-4">
				<section className="flex h-full w-full gap-4">
					<Sidebar dataOutletSelection={dataOutletSelection || undefined} />
					<audio ref={audioRef} src="/sounds/notif.mp3" />
					<div className="h-full flex-1 overflow-y-scroll">
						<Transition asPath={pathname}>{children}</Transition>
					</div>
				</section>
				<audio ref={audioRef} src="/sounds/notif.mp3" />
			</main>
		</ProSidebarProvider>
	);
};

export default OrganismsLayout;
