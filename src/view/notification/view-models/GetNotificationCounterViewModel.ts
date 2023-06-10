import {GetNotificationCounterDataResponse} from '@/data/notification/types/GetNotificationCounterType';
import {useGetNotificationCounterUsecase} from '@/data/notification/usecases/GetNotificationCounterUsecase';
import {GetNotificationCounterResult} from '@/domain/notification/repositories/GetNotificationCounterRepository';
import {Response} from '@/domain/vo/BaseResponse';
import {UseQueryOptions} from '@tanstack/react-query';

export const useGetNotificationCounterViewModel = (
	options?: UseQueryOptions<Response<GetNotificationCounterDataResponse>>,
): GetNotificationCounterResult => {
	const result = useGetNotificationCounterUsecase(options);

	return result;
};
