import {dateFormatter, toUnix} from '@/utils/dateFormatter';
import React from 'react';

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
}: MoleculesSubscriptionReminderProps) => (
	<div
		className={`${
			checkSubscriptionExpired(end_date) ? 'bg-error' : 'bg-secondary-border'
		} w-[90%] rounded-r-2xl py-2 px-6 text-neutral-90`}
	>
		<p className="text-m-semibold line-clamp-1">
			{checkSubscriptionExpired(end_date)
				? 'Subscription Expired'
				: 'Subscription Reminder'}
		</p>
		<p className="text-m-regular line-clamp-1">
			{`Exp date: ${dateFormatter(end_date, 'dd MMM yyyy')}`}
		</p>
	</div>
);

export default MoleculesSubscriptionReminder;
