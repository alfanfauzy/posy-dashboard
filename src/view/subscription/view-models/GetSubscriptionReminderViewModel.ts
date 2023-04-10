import {GetSubscriptionReminderDataResponse} from '@/data/subscription/types';
import {useGetSubscriptionReminderUsecase} from '@/data/subscription/usecases/GetSubscriptionReminderUsecase';
import {GetSubscriptionReminderResult} from '@/domain/subscription/repositories/SubscriptionRepository';
import {Response} from '@/domain/vo/BaseResponse';
import {UseQueryOptions} from '@tanstack/react-query';

export const useGetSubscriptionReminderViewModel = (
	options?: UseQueryOptions<Response<GetSubscriptionReminderDataResponse>>,
): GetSubscriptionReminderResult => {
	const result = useGetSubscriptionReminderUsecase(options);

	return result;
};
