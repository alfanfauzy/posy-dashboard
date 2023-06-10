import NoOrderIcon from '@/view/common/assets/icons/noOrder';
import {listNotificationTabs} from '@/view/common/constants/notification';
import {useAppSelector} from '@/view/common/store/hooks';
import {useGetNotificationCounterViewModel} from '@/view/notification/view-models/GetNotificationCounterViewModel';
import {useGetNotificationsViewModel} from '@/view/notification/view-models/GetNotificationsViewModel';
import {Button, Loading} from 'posy-fnb-core';
import React, {useState} from 'react';
import {IoMdClose} from 'react-icons/io';

import Notificationitem from '../../molecules/notification-item';

type NotificationSidebarProps = {
	closeNotificationSidebar: () => void;
};

const NotificationSidebar = ({
	closeNotificationSidebar,
}: NotificationSidebarProps) => {
	const {outletId} = useAppSelector(state => state.auth);

	const [tabValueOrder, setTabValueOrder] = useState(0);

	const {data: dataCounter} = useGetNotificationCounterViewModel();

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
		<main className="relative min-w-[380px] max-w-[380px] h-full rounded-l-2xl bg-neutral-10">
			<article className="flex h-full flex-col p-4">
				<section>
					<div className="flex items-center justify-between">
						<p className="text-xl-bold">Notification</p>
						<IoMdClose
							size={28}
							className="cursor-pointer hover:opacity-70"
							onClick={closeNotificationSidebar}
						/>
					</div>
				</section>

				<section className="mt-6 w-full h-fit flex bg-slate-100 rounded-full border border-neutral-50">
					{listNotificationTabs.map(tab =>
						tabValueOrder === tab.value ? (
							<Button
								key={tab.value}
								className="w-1/2 text-m-bold"
								onClick={() => setTabValueOrder(tabValueOrder)}
							>
								<div className="flex items-center gap-1 justify-center">
									<p>{tab.label}</p>
									<div className="rounded-full w-fit px-2 py-0.5 bg-secondary-main shadow text-s-bold">
										2{/* {dataCounter.inbox} */}
									</div>
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
								<div className="rounded-full w-fit px-2 py-0.5 bg-secondary-main shadow text-s-bold text-white">
									2{/* {dataCounter.inbox} */}
								</div>
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
					<div className="flex h-full w-full flex-col items-center justify-center gap-4">
						<div className="-mt-24">
							<NoOrderIcon />
							<p className="mt-4 text-l-medium">There’s no notification yet</p>
						</div>
					</div>
				)}

				{dataNotification && (
					<div className="mt-2 overflow-auto">
						{dataNotification.map((item, idx) => (
							<Notificationitem
								key={idx}
								item={item}
								idx={idx}
								lengthData={dataNotification.length}
								closeNotificationSidebar={closeNotificationSidebar}
							/>
						))}
					</div>
				)}
			</article>
		</main>
	);
};

export default NotificationSidebar;
