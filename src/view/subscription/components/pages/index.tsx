import NavDrawer from '@/view/common/components/molecules/nav-drawer';
import {useAppSelector} from '@/view/common/store/hooks';
import {logEvent} from '@/view/common/utils/UtilsAnalytics';
import {useGetGeneralSettingsViewModel} from '@/view/outlet/view-models/GetGeneralSettingsViewModel';
import {useGetSubscriptionSectionViewModel} from '@/view/subscription/view-models/GetSubscriptionSectionViewModel';
import dynamic from 'next/dynamic';
import React, {useEffect, useLayoutEffect, useState} from 'react';

import DigitalMenuSettings from '../organisms/modal/subscription-needed/settings/digital-menu';
import SubscriptionPlan from '../templates/subscription-plan';

const SubscriptionNeededModal = dynamic(
	() => import('../organisms/modal/subscription-needed'),
	{
		loading: () => <div />,
	},
);

const ViewSubscriptionPage = () => {
	const {outletId} = useAppSelector(state => state.auth);
	const [isOpenModal, setIsOpenModal] = useState(false);
	const [isFirstRender, setIsFirstRender] = useState(true);

	const {data: dataSubscription, isLoading: loadSubscription} =
		useGetSubscriptionSectionViewModel();

	const {data: dataGeneralSettings, isLoading: loadGeneralSettings} =
		useGetGeneralSettingsViewModel(
			{
				restaurant_outlet_uuid: outletId,
			},
			{
				enabled: !!(outletId && dataSubscription?.isSubscription),
			},
		);

	useLayoutEffect(() => {
		if (
			isFirstRender &&
			dataSubscription &&
			!dataSubscription?.isSubscription
		) {
			setIsOpenModal(true);
			setIsFirstRender(false);
		}
	}, [dataSubscription, isFirstRender]);

	useEffect(() => {
		logEvent({
			category: 'subscription',
			action: 'subscription_view',
		});
	}, []);

	return (
		<main className="flex h-full w-full bg-neutral-10">
			<article className="flex h-full w-full flex-col rounded-lg p-4">
				<NavDrawer title="General Settings" />
				<section className="mt-6 flex flex-col gap-6">
					<DigitalMenuSettings
						data={dataGeneralSettings}
						isLoading={loadGeneralSettings}
					/>
					{/* <ShiftManagementSettings /> */}
					<SubscriptionPlan
						data={dataSubscription}
						isLoading={loadSubscription}
					/>
				</section>
			</article>
			{isOpenModal && (
				<SubscriptionNeededModal
					isOpen={isOpenModal}
					setIsOpen={setIsOpenModal}
				/>
			)}
		</main>
	);
};

export default ViewSubscriptionPage;
