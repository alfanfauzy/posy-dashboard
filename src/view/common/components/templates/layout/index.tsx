/* eslint-disable react-hooks/exhaustive-deps */

import Transition from '@/view/common/components/atoms/animations/transition';
import Sidebar from '@/view/common/components/templates/sidebar';
import {UNPROTECT_ROUTES} from '@/view/common/config/link';
import {useAppDispatch, useAppSelector} from '@/view/common/store/hooks';
import {setIsSubscription} from '@/view/common/store/slices/auth';
import {useGetOutletSelectionViewModel} from '@/view/outlet/GetOutletSelectionViewModel';
import {useGetSubscriptionSectionViewModel} from '@/view/subscription/view-models/GetSubscriptionSectionViewModel';
import {useRouter} from 'next/router';
import {Loading} from 'posy-fnb-core';
import React, {ReactNode, useEffect, useState} from 'react';
import {ProSidebarProvider} from 'react-pro-sidebar';

type OrganismsLayoutProps = {
	children: ReactNode;
};

const OrganismsLayout = ({children}: OrganismsLayoutProps) => {
	const dispatch = useAppDispatch();
	const {replace, asPath, pathname} = useRouter();
	const {isLoggedIn, isSubscription} = useAppSelector(state => state.auth);
	const [loading, setLoading] = useState(true);

	const {data: dataSubscription} = useGetSubscriptionSectionViewModel({
		queryKey: [pathname],
		enabled: isLoggedIn,
	});

	const {data: dataOutletSelection} = useGetOutletSelectionViewModel({
		enabled: isLoggedIn && isSubscription,
	});

	// const [firstRender, setFirstRender] = useState(true)

	// useEffect(() => {
	//   // if (!firstRender) {
	//   if (!isLoggedIn) router.replace('/auth/login')
	//   else if (router.asPath === '/') {
	//     router.replace('/transaction')
	//     setLoading(false)
	//   } else {
	//     setLoading(false)
	//   }
	//   // } else {
	//   //   setFirstRender(false)
	//   // }
	// }, [isLoggedIn, router])

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

	if (loading) {
		return (
			<main className="flex h-screen w-full items-center justify-center">
				<Loading backgroundColor="#2F265B" color="#2F265B" size={100} />
			</main>
		);
	}

	return (
		<ProSidebarProvider>
			<main className="h-screen max-h-screen overflow-x-auto overflow-y-hidden bg-neutral-30 py-4">
				<section className="flex h-full w-full gap-4">
					<Sidebar dataOutletSelection={dataOutletSelection || undefined} />
					<div className="h-full flex-1 overflow-y-scroll">
						<Transition asPath={pathname}>{children}</Transition>
					</div>
				</section>
			</main>
		</ProSidebarProvider>
	);
};

export default OrganismsLayout;
