import {GetNotificationsDataResponse} from '@/data/notification/types/GetNotificationsType';
import {useGetNotificationsUsecase} from '@/data/notification/usecases/GetNotificationsUsecase';
import {
	GetNotificationsInput,
	GetNotificationsResult,
} from '@/domain/notification/repositories/GetNotificationsRepository';
import {DataList, Response} from '@/domain/vo/BaseResponse';
import {UseQueryOptions} from '@tanstack/react-query';

export const useGetNotificationsViewModel = (
	input: GetNotificationsInput,
	options?: UseQueryOptions<Response<DataList<GetNotificationsDataResponse>>>,
): GetNotificationsResult => {
	const result = useGetNotificationsUsecase(input, options);

	return result;
};
