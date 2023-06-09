import {mapToBaseError} from '@/data/common/mappers/ErrorMapper';
import {MutationOptions} from '@/data/common/types';
import {
	CreateSetReadNotificationInput,
	CreateSetReadNotificationRepository,
} from '@/domain/notification/repositories/CreateSetReadNotificationRepository';
import {BaseError} from '@/domain/vo/BaseError';
import {useQueryClient} from '@tanstack/react-query';
import {useSnackbar} from 'notistack';

import {mapToSetReadNotification} from '../mappers/notificationMapper';
import {useCreateSetReadNotificationMutation} from '../sources/CreateSetReadNotificationMutation';
import {GetNotificationsQueryKey} from '../sources/GetNotificationsQuery';

export const useCreateSetReadNotificationUsecase = ({
	onError,
	onSuccess,
	...options
}: MutationOptions): CreateSetReadNotificationRepository => {
	let error: BaseError | null = null;
	const {enqueueSnackbar} = useSnackbar();
	const queryClient = useQueryClient();

	const {
		mutate,
		data,
		error: _error,
		...rest
	} = useCreateSetReadNotificationMutation({
		onSuccess: (dataSuccess, vars, ...args) => {
			if (dataSuccess) {
				onSuccess?.(mapToSetReadNotification(dataSuccess?.data), vars, ...args);
				queryClient.invalidateQueries([GetNotificationsQueryKey]);
			}
		},
		onError: (dataError, ...args) => {
			if (dataError) {
				const err = mapToBaseError(dataError);
				onError?.(err, ...args);
				enqueueSnackbar({
					message: err.message,
					variant: 'error',
				});
			}
		},
		...options,
	});

	const createSetReadNotification = (input: CreateSetReadNotificationInput) => {
		mutate(input);
	};

	if (_error) {
		error = mapToBaseError(_error);
	}

	if (data?.data) {
		return {
			createSetReadNotification,
			data: mapToSetReadNotification(data?.data),
			error,
			...rest,
		};
	}

	return {
		createSetReadNotification,
		data: undefined,
		error,
		...rest,
	};
};
