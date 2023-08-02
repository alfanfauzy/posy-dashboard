/* eslint-disable react-hooks/exhaustive-deps */
import {GetAreasQueryKey} from '@/data/area/sources/GetAreasQuery';
import {GetNotificationCounterQueryKey} from '@/data/notification/sources/GetNotificationCounterQuery';
import {GetNotificationsQueryKey} from '@/data/notification/sources/GetNotificationsQuery';
import {GetOrdersQueryKey} from '@/data/order/sources/GetOrdersQuery';
import {GetTableLayoutByFloorQueryKey} from '@/data/table/sources/GetTableLayoutByFloorQuery';
import {GetTransactionQueryKey} from '@/data/transaction/sources/GetTransactionQuery';
import {GetTransactionsQueryKey} from '@/data/transaction/sources/GetTransactionsQuery';
import {GetTransactionSummaryQueryKey} from '@/data/transaction/sources/GetTransactionSummaryQuery';
import CancelIcon from '@/view/common/assets/icons/cancel';
import Transition from '@/view/common/components/atoms/animations/transition';
import Sidebar from '@/view/common/components/templates/sidebar';
import firebaseApp from '@/view/common/config/firebase';
import {UNPROTECT_ROUTES} from '@/view/common/config/link';
import useViewportListener from '@/view/common/hooks/useViewportListener';
import {useAppDispatch, useAppSelector} from '@/view/common/store/hooks';
import {
	setIsSubscription,
	setOpenDrawer,
	setRestaurantOutletId,
} from '@/view/common/store/slices/auth';
import {onChangeShowDigitalMenu} from '@/view/common/store/slices/general-settings';
import {onChangeSelectedTrxId} from '@/view/common/store/slices/transaction';
import {useGetGeneralSettingsViewModel} from '@/view/outlet/view-models/GetGeneralSettingsViewModel';
import {useGetOutletSelectionViewModel} from '@/view/outlet/view-models/GetOutletSelectionViewModel';
import {useGetSubscriptionSectionViewModel} from '@/view/subscription/view-models/GetSubscriptionSectionViewModel';
import {useQueryClient} from '@tanstack/react-query';
import {Drawer} from 'antd';
import {getMessaging, onMessage} from 'firebase/messaging';
import {useRouter} from 'next/router';
import {closeSnackbar, useSnackbar} from 'notistack';
import {Loading} from 'posy-fnb-core';
import React, {ReactNode, useEffect, useMemo, useRef, useState} from 'react';
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
	const {width} = useViewportListener();
	const {replace, asPath, pathname} = useRouter();
	const {isLoggedIn, isSubscription, openDrawer, outletId} = useAppSelector(
		state => state.auth,
	);
	const [loading, setLoading] = useState(true);
	const audioRef =
		useRef<HTMLAudioElement>() as React.MutableRefObject<HTMLAudioElement>;
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
				queryClient.invalidateQueries([GetTransactionQueryKey]);
				queryClient.invalidateQueries([
					GetOrdersQueryKey,
					{transaction_uuid: message?.data.transaction_uuid},
				]);
				queryClient.invalidateQueries([GetTransactionSummaryQueryKey]);
				queryClient.invalidateQueries([GetNotificationCounterQueryKey]);
				queryClient.invalidateQueries([GetNotificationsQueryKey]);
				queryClient.invalidateQueries([GetAreasQueryKey]);
				queryClient.invalidateQueries([GetTableLayoutByFloorQueryKey]);

				if (message.data?.category === 'PAYMENT') {
					dispatch(
						onChangeSelectedTrxId({
							id: '',
						}),
					);
				}

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

	const outletOptions = useMemo(
		() =>
			dataOutletSelection?.map(entry => ({
				label: entry.outlet_name,
				value: entry.uuid,
			})) ?? [],
		[dataOutletSelection],
	);

	useEffect(() => {
		if (!outletId && outletOptions?.length > 0) {
			dispatch(setRestaurantOutletId(outletOptions[0]?.value));
		}
	}, [dispatch, outletId, outletOptions]);

	const {isLoading: loadGeneralSettings} = useGetGeneralSettingsViewModel(
		{
			restaurant_outlet_uuid: outletId,
		},
		{
			enabled: !!(outletId && dataSubscription?.isSubscription),
			onSuccess: dataGeneralSettings => {
				dispatch(
					onChangeShowDigitalMenu(
						dataGeneralSettings?.data.general_setting?.use_digital_menu,
					),
				);
			},
		},
	);

	if (loading || loadGeneralSettings) {
		return (
			<main className="flex h-screen w-full items-center justify-center">
				<Loading size={100} />
			</main>
		);
	}

	return (
		<ProSidebarProvider>
			<main className="h-screen max-h-screen overflow-x-auto overflow-y-hidden bg-neutral-30">
				<section className="flex h-full w-full gap-2">
					{width > 1280 ? (
						<div>
							<Sidebar outletOptions={outletOptions} />
						</div>
					) : (
						<Drawer
							placement="left"
							width={200}
							onClose={() => dispatch(setOpenDrawer(false))}
							open={openDrawer}
							closeIcon={null}
							headerStyle={{display: 'none'}}
						>
							<Sidebar isDrawer outletOptions={outletOptions} />
						</Drawer>
					)}

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
