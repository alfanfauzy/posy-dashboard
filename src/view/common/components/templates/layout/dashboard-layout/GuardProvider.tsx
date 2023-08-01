import {UNPROTECT_ROUTES} from '@/view/common/config/link';
import {useAppDispatch, useAppSelector} from '@/view/common/store/hooks';
import {
	setIsSubscription,
	setRestaurantOutletId,
} from '@/view/common/store/slices/auth';
import {useGetSubscriptionSectionViewModel} from '@/view/subscription/view-models/GetSubscriptionSectionViewModel';
import {useRouter} from 'next/router';
import {Loading} from 'posy-fnb-core';
import React, {useEffect, useState} from 'react';

import {type OutletOptionsType} from '../../sidebar';

type GuardProviderProps = {
	children: React.ReactNode;
	outletOptions: OutletOptionsType;
};

const GuardProvider = ({children, outletOptions}: GuardProviderProps) => {
	const dispatch = useAppDispatch();
	const [loading, setLoading] = useState(true);
	const {replace, asPath, pathname} = useRouter();
	const {isLoggedIn, outletId} = useAppSelector(state => state.auth);

	const {data: dataSubscription} = useGetSubscriptionSectionViewModel({
		queryKey: [pathname],
		enabled: isLoggedIn,
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
	}, [asPath, isLoggedIn, dataSubscription, replace]);

	useEffect(() => {
		if (dataSubscription) {
			dispatch(setIsSubscription(dataSubscription.isSubscription));
		}
	}, [dataSubscription, dispatch]);

	useEffect(() => {
		if (!outletId && outletOptions?.length > 0) {
			dispatch(setRestaurantOutletId(outletOptions[0]?.value));
		} else {
			dispatch(setRestaurantOutletId(outletId));
		}
	}, [dispatch, outletId, outletOptions]);

	if (loading) {
		return (
			<main className="flex h-screen w-full items-center justify-center">
				<Loading size={100} />
			</main>
		);
	}

	return <main>{children}</main>;
};

export default GuardProvider;
