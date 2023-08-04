import {useAppDispatch, useAppSelector} from '@/view/common/store/hooks';
import {onChangeShowDigitalMenu} from '@/view/common/store/slices/general-settings';
import {useGetGeneralSettingsViewModel} from '@/view/outlet/view-models/GetGeneralSettingsViewModel';
import dynamic from 'next/dynamic';
import {Loading} from 'posy-fnb-core';
import React from 'react';

const TransactionSection = dynamic(
	() => import('@/view/transaction/components/templates/transaction-section'),
	{
		loading: () => <div />,
	},
);

const TransactionSidebabar = dynamic(
	() => import('../templates/transaction-sidebar'),
	{
		loading: () => <div />,
	},
);

const NotificationSidebar = dynamic(
	() => import('../templates/notification-sidebar'),
	{
		loading: () => <div />,
	},
);

const TableCapacity = dynamic(() => import('../organisms/table-capacity'), {
	loading: () => <div />,
});

const ViewTransactionPage = () => {
	const dispatch = useAppDispatch();
	const {isSubscription, outletId} = useAppSelector(state => state.auth);
	const {isOpenNotifBar, isOpenTableCapacity, selectedTrxId} = useAppSelector(
		state => state.transaction,
	);

	const {isLoading: loadGeneralSettings} = useGetGeneralSettingsViewModel(
		{
			restaurant_outlet_uuid: outletId,
		},
		{
			enabled: !!(outletId && isSubscription),
			onSuccess: dataGeneralSettings => {
				dispatch(
					onChangeShowDigitalMenu(
						dataGeneralSettings?.data.general_setting?.use_digital_menu,
					),
				);
			},
		},
	);

	const renderSidebar = () => {
		if (isOpenNotifBar && !selectedTrxId) {
			return <NotificationSidebar />;
		} else if (selectedTrxId && !isOpenNotifBar) {
			return <TransactionSidebabar />;
		}
	};

	if (loadGeneralSettings) {
		return (
			<main className="flex h-screen w-full items-center justify-center">
				<Loading size={100} />
			</main>
		);
	}

	return (
		<main className="flex h-full gap-2 overflow-x-hidden overflow-y-hidden">
			<TransactionSection />
			{renderSidebar()}
			{isOpenTableCapacity && <TableCapacity />}
		</main>
	);
};

export default ViewTransactionPage;
