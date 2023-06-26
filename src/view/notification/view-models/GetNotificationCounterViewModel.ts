import {GetNotificationCounterDataResponse} from '@/data/notification/types/GetNotificationCounterType';
import {useGetNotificationCounterUsecase} from '@/data/notification/usecases/GetNotificationCounterUsecase';
import {
	GetNotificationCounterInput,
	GetNotificationCounterResult,
} from '@/domain/notification/repositories/GetNotificationCounterRepository';
import {Response} from '@/domain/vo/BaseResponse';
import {UseQueryOptions} from '@tanstack/react-query';

export const useGetNotificationCounterViewModel = (
	input: GetNotificationCounterInput,
	options?: UseQueryOptions<Response<GetNotificationCounterDataResponse>>,
): GetNotificationCounterResult => {
	const result = useGetNotificationCounterUsecase(input, options);

	return result;
};
