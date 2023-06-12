import Get from '@/data/common/api/get';
import {Response} from '@/domain/vo/BaseResponse';
import {useQuery, UseQueryOptions} from '@tanstack/react-query';

import {GetNotificationCounterDataResponse} from '../types/GetNotificationCounterType';

export const GetNotificationCounterQueryKey =
	'NotificationCounter/list' as const;

const GetNotificationCounter = async (): Promise<
	Response<GetNotificationCounterDataResponse>
> => {
	const response = await Get({
		endpoint: `/notification-service/notification/count`,
	});

	return {
		code: response?.code,
		data: response?.data,
		message: response?.message,
		more_info: response?.more_info,
	};
};

export const useGetNotificationCounterQuery = (
	options?: UseQueryOptions<Response<GetNotificationCounterDataResponse>>,
) =>
	useQuery<Response<GetNotificationCounterDataResponse>>(
		[GetNotificationCounterQueryKey],
		GetNotificationCounter,
		{
			refetchOnWindowFocus: false,
			...options,
		},
	);
