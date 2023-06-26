import Post from '@/data/common/api/post';
import {GetNotificationsInput} from '@/domain/notification/repositories/GetNotificationsRepository';
import {DataList, Response} from '@/domain/vo/BaseResponse';
import {useQuery, UseQueryOptions} from '@tanstack/react-query';

import {GetNotificationsDataResponse} from '../types/GetNotificationsType';

export const GetNotificationsQueryKey = 'Notifications/list' as const;

const GetNotifications = async (
	input: GetNotificationsInput,
): Promise<Response<DataList<GetNotificationsDataResponse>>> => {
	const response = await Post({
		endpoint: `/notification-service/notification/${input.notification_type}/get-list`,
		data: input,
	});

	return {
		code: response?.code,
		data: response?.data,
		message: response?.message,
		more_info: response?.more_info,
	};
};

export const useGetNotificationsQuery = (
	input: GetNotificationsInput,
	options?: UseQueryOptions<Response<DataList<GetNotificationsDataResponse>>>,
) =>
	useQuery<Response<DataList<GetNotificationsDataResponse>>>(
		[GetNotificationsQueryKey, input],
		() => GetNotifications(input),
		{
			refetchOnWindowFocus: false,
			...options,
		},
	);
