import Badge from '@/view/common/components/atoms/badge';
import {listNotificationTabs} from '@/view/common/constants/notification';
import {useAppDispatch, useAppSelector} from '@/view/common/store/hooks';
import {onChangeToggleNotifBar} from '@/view/common/store/slices/transaction';
import {useGetNotificationCounterViewModel} from '@/view/notification/view-models/GetNotificationCounterViewModel';
import {useGetNotificationsViewModel} from '@/view/notification/view-models/GetNotificationsViewModel';
import {Button, Loading} from 'posy-fnb-core';
import React, {useState} from 'react';
import {IoMdClose} from 'react-icons/io';

import EmptyData from '../../molecules/empty-state/empty-data';
import Notificationitem from '../../molecules/notification-item';

const NotificationSidebar = () => {
	const dispatch = useAppDispatch();
	const {outletId} = useAppSelector(state => state.auth);

	const [tabValueOrder, setTabValueOrder] = useState(0);

	const {data: dataCounter} = useGetNotificationCounterViewModel({
		parent_type: 'restaurant_outlet_uuid',
		parent_uuid: outletId,
	});

	const {data: dataNotification, isLoading: loadNotification} =
		useGetNotificationsViewModel(
			{
				is_read: false,
				parent_type: 'restaurant_outlet_uuid',
				parent_uuid: outletId,
				notification_type: tabValueOrder === 0 ? 'transaction' : 'inbox',
			},
			{enabled: !!outletId},
		);

	return (
		<main className="relative lg:min-w-[350px] lg:max-w-[350px] min-w-[310px] max-w-[310px] h-full rounded-l-lg bg-neutral-10">
			<article className="flex h-full flex-col p-4">
				<section>
					<div className="flex items-center justify-between">
						<p className="text-xl-bold">Notification</p>
						<IoMdClose
							size={28}
							className="cursor-pointer hover:opacity-70"
							onClick={() => dispatch(onChangeToggleNotifBar(false))}
						/>
					</div>
				</section>

				<section className="mt-6 w-full h-fit flex bg-slate-100 rounded-full border border-neutral-50">
					{listNotificationTabs.map(tab =>
						tabValueOrder === tab.value ? (
							<Button
								size="m"
								key={tab.value}
								className="w-1/2 text-m-bold"
								onClick={() => setTabValueOrder(tabValueOrder)}
							>
								<div className="flex items-center gap-1 justify-center">
									<p>{tab.label}</p>
									{dataCounter && dataCounter[tab.key] > 0 && (
										<Badge count={dataCounter[tab.key]} />
									)}
								</div>
							</Button>
						) : (
							<div
								key={tab.value}
								onClick={() => {
									setTabValueOrder(tab.value);
								}}
								className="w-1/2 flex gap-1 items-center justify-center text-m-bold cursor-pointer hover:opacity-70 duration-300 ease-in-out"
							>
								{tab.label}
								{dataCounter && dataCounter[tab.key] > 0 && (
									<Badge
										count={dataCounter[tab.key]}
										className="text-neutral-10"
									/>
								)}
							</div>
						),
					)}
				</section>

				{loadNotification && (
					<div className="flex h-full w-full items-center justify-center">
						<Loading size={75} />
					</div>
				)}

				{!dataNotification && !loadNotification && (
					<EmptyData message="There's no notification yet" />
				)}

				{dataNotification && (
					<div className="mt-2 overflow-auto">
						{dataNotification.map((item, idx) => (
							<Notificationitem
								key={idx}
								item={item}
								idx={idx}
								lengthData={dataNotification.length}
							/>
						))}
					</div>
				)}
			</article>
		</main>
	);
};

export default NotificationSidebar;
