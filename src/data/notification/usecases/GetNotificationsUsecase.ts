import {
	GetNotificationsInput,
	GetNotificationsResult,
} from '@/domain/notification/repositories/GetNotificationsRepository';
import {DataList, Response} from '@/domain/vo/BaseResponse';
import {UseQueryOptions} from '@tanstack/react-query';

import {mapToNotificationsModel} from '../mappers/notificationMapper';
import {useGetNotificationsQuery} from '../sources/GetNotificationsQuery';
import {GetNotificationsDataResponse} from '../types/GetNotificationsType';

export const useGetNotificationsUsecase = (
	input: GetNotificationsInput,
	options?: UseQueryOptions<Response<DataList<GetNotificationsDataResponse>>>,
): GetNotificationsResult => {
	const {data, ...rest} = useGetNotificationsQuery(input, options);

	if (data?.data?.objs) {
		const dataMapper = mapToNotificationsModel(data.data.objs);

		return {
			data: dataMapper,
			...rest,
		};
	}

	return {
		data: undefined,
		...rest,
	};
};
