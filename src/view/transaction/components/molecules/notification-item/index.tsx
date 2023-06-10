import {
	Notification,
	NotificationAction,
	NotificationCategory,
} from '@/domain/notification/model';
import {useAppDispatch} from '@/view/common/store/hooks';
import {onChangeSelectedTrxId} from '@/view/common/store/slices/transaction';
import {dateFormatter} from '@/view/common/utils/UtilsdateFormatter';
import {useCreateSetReadNotificationViewModel} from '@/view/notification/view-models/CreateSetReadNotificationViewModel';
import {Divider} from 'antd';
import React from 'react';
import {AiFillPrinter} from 'react-icons/ai';
import {IoMdClose} from 'react-icons/io';
import {useSwipeable} from 'react-swipeable';

const generateIcon = (category: NotificationCategory) => {
	const icons = {
		[NotificationCategory.ORDER]: (
			<AiFillPrinter className="text-secondary-main" />
		),
	};

	return icons[category];
};

type NotificationitemProps = {
	item: Notification;
	lengthData: number;
	idx: number;
	closeNotificationSidebar: () => void;
};

const Notificationitem = ({
	item,
	lengthData,
	idx,
	closeNotificationSidebar,
}: NotificationitemProps) => {
	const dispatch = useAppDispatch();
	const {createSetReadNotification} = useCreateSetReadNotificationViewModel({});

	const swipeHandlers = useSwipeable({
		onSwiped: eventData => console.log('User Swiped!', eventData),
		onSwipedRight: eventData => console.log('User Swiped!', eventData),
		// ...config,
	});

	const onClickNotification = () => {
		if (item.action === NotificationAction.RECEIVED_NEW_ORDER) {
			dispatch(
				onChangeSelectedTrxId({
					id: item.transaction_uuid,
				}),
			);
			setTimeout(() => {
				closeNotificationSidebar();
			}, 300);
		}
	};

	return (
		<>
			<div
				{...swipeHandlers}
				key={item.uuid}
				className="flex items-start p-3 gap-3"
			>
				<div onClick={onClickNotification} className="flex flex-1 gap-3">
					<div className="mt-0.5">{generateIcon(item.category)}</div>
					<div>
						<p className="text-m-regular">{item.content}</p>
						<p className="text-s-regular text-neutral-80">
							{dateFormatter(item.created_at, 'HH:mm')}
						</p>
					</div>
				</div>
				<div>
					<IoMdClose
						className="text-neutral-50 hover:opacity-70 cursor-pointer"
						size={20}
						onClick={() =>
							createSetReadNotification({
								parent_type: item.parent_type,
								parent_uuid: item.parent_uuid,
								notification_uuid: item.uuid,
								notification_type: item.type,
							})
						}
					/>
				</div>
			</div>
			{idx !== lengthData - 1 && <Divider className="!my-0" />}
		</>
	);
};

export default Notificationitem;
