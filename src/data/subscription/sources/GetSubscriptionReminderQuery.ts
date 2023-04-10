import Get from '@/data/common/api/get';
import {Response} from '@/domain/vo/BaseResponse';
import {useQuery, UseQueryOptions} from '@tanstack/react-query';

import {GetSubscriptionReminderDataResponse} from '../types';

export const GetSubscriptionReminderQueryKey = (key?: ReadonlyArray<unknown>) =>
	['Subscription/reminder', key] as const;

export const GetSubscriptionReminder = async (): Promise<
	Response<GetSubscriptionReminderDataResponse>
> => {
	const response = await Get({
		endpoint:
			'/user-service/outlet/setting/restaurant/get-subscription-reminder',
	});

	return {
		code: response?.code,
		data: response?.data,
		message: response?.message,
		more_info: response?.more_info,
	};
};

export const useGetSubscriptionReminderQuery = (
	options?: UseQueryOptions<Response<GetSubscriptionReminderDataResponse>>,
) =>
	useQuery<Response<GetSubscriptionReminderDataResponse>>(
		GetSubscriptionReminderQueryKey(options?.queryKey),
		() => GetSubscriptionReminder(),
		{
			refetchOnWindowFocus: false,
			...options,
		},
	);
