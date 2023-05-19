import {dateFormatter, toUnix} from '@/view/common/utils/UtilsdateFormatter';
import React from 'react';
import {useProSidebar} from 'react-pro-sidebar';

type MoleculesSubscriptionReminderProps = {
	end_date: number;
};

const checkSubscriptionExpired = (end_date: number) => {
	if (Number(toUnix(new Date())) > end_date) {
		return true;
	}
	return false;
};

const MoleculesSubscriptionReminder = ({
	end_date,
}: MoleculesSubscriptionReminderProps) => {
	const {collapsed} = useProSidebar();
	return (
		<div
			className={`${
				checkSubscriptionExpired(end_date) ? 'bg-error' : 'bg-secondary-border'
			} w-full rounded-r-md py-2 text-neutral-90 ${
				collapsed ? 'px-2' : 'px-5'
			}`}
		>
			<p className="text-s-semibold line-clamp-1">
				{checkSubscriptionExpired(end_date)
					? 'Subscription Expired'
					: 'Subscription Reminder'}
			</p>
			<p className="text-m-regular line-clamp-1">
				{`Exp date: ${dateFormatter(end_date, 'dd MMM yyyy')}`}
			</p>
		</div>
	);
};

export default MoleculesSubscriptionReminder;
