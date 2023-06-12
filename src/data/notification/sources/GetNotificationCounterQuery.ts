import Post from '@/data/common/api/post';
import {GetNotificationCounterInput} from '@/domain/notification/repositories/GetNotificationCounterRepository';
import {Response} from '@/domain/vo/BaseResponse';
import {useQuery, UseQueryOptions} from '@tanstack/react-query';

import {GetNotificationCounterDataResponse} from '../types/GetNotificationCounterType';

export const GetNotificationCounterQueryKey =
	'NotificationCounter/list' as const;

const GetNotificationCounter = async (
	input: GetNotificationCounterInput,
): Promise<Response<GetNotificationCounterDataResponse>> => {
	const response = await Post({
		endpoint: `/notification-service/notification/count`,
		data: input,
	});

	return {
		code: response?.code,
		data: response?.data,
		message: response?.message,
		more_info: response?.more_info,
	};
};

export const useGetNotificationCounterQuery = (
	input: GetNotificationCounterInput,
	options?: UseQueryOptions<Response<GetNotificationCounterDataResponse>>,
) =>
	useQuery<Response<GetNotificationCounterDataResponse>>(
		[GetNotificationCounterQueryKey],
		() => GetNotificationCounter(input),
		{
			refetchOnWindowFocus: false,
			...options,
		},
	);
