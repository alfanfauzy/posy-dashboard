import {MutationOptions} from '@/data/common/types';
import {useCreateSetReadNotificationUsecase} from '@/data/notification/usecases/CreateSetReadNotificationUsecase';
import {CreateSetReadNotificationRepository} from '@/domain/notification/repositories/CreateSetReadNotificationRepository';

export const useCreateSetReadNotificationViewModel = (
	options: MutationOptions,
): CreateSetReadNotificationRepository => {
	const result = useCreateSetReadNotificationUsecase(options);

	return result;
};
