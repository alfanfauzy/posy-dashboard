import {
	GetNotificationCounterInput,
	GetNotificationCounterResult,
} from '@/domain/notification/repositories/GetNotificationCounterRepository';
import {Response} from '@/domain/vo/BaseResponse';
import {UseQueryOptions} from '@tanstack/react-query';

import {mapToNotificationCounterModel} from '../mappers/notificationMapper';
import {useGetNotificationCounterQuery} from '../sources/GetNotificationCounterQuery';
import {GetNotificationCounterDataResponse} from '../types/GetNotificationCounterType';

export const useGetNotificationCounterUsecase = (
	input: GetNotificationCounterInput,
	options?: UseQueryOptions<Response<GetNotificationCounterDataResponse>>,
): GetNotificationCounterResult => {
	const {data, ...rest} = useGetNotificationCounterQuery(input, options);

	if (data?.data) {
		const dataMapper = mapToNotificationCounterModel(data.data);

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
