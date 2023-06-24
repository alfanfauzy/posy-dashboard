import Post from '@/data/common/api/post';
import {CreateSetReadNotificationInput} from '@/domain/notification/repositories/CreateSetReadNotificationRepository';
import {Response} from '@/domain/vo/BaseResponse';
import {UseMutationOptions, useMutation} from '@tanstack/react-query';
import {AxiosError} from 'axios';

import {CreateSetReadNotificationDataResponse} from '../types/CreateSetReadNotificationType';

const CreateSetReadNotification = async (
	input: CreateSetReadNotificationInput,
): Promise<Response<CreateSetReadNotificationDataResponse>> => {
	const response = await Post({
		endpoint: `/notification-service/notification/${input.notification_type}/set-read`,
		data: input,
	});

	return {
		code: response?.code,
		data: response?.data,
		message: response?.message,
		more_info: response?.more_info,
	};
};

export const useCreateSetReadNotificationMutation = (
	options: UseMutationOptions<
		Response<CreateSetReadNotificationDataResponse>,
		AxiosError<Response>,
		CreateSetReadNotificationInput
	>,
) =>
	useMutation({
		mutationFn: CreateSetReadNotification,
		...options,
	});
