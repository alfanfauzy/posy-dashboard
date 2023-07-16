import {
	GetTransactionRatingsInput,
	GetTransactionRatingsResult,
} from '@/domain/rating/repositories/GetTransactionRatingsRepository';
import {DataList, Response} from '@/domain/vo/BaseResponse';
import {UseQueryOptions} from '@tanstack/react-query';

import {mapToTransactionRatingsModel} from '../mappers/RatingMapper';
import {useGetTransactionRatingsQuery} from '../sources/GetTransactionRatingsQuery';
import {GetTransactionRatingsDataResponse} from '../types/GetTransactionRatingsType';

export const useGetTransactionRatingsUsecase = (
	input: GetTransactionRatingsInput,
	options?: UseQueryOptions<
		Response<DataList<GetTransactionRatingsDataResponse>>
	>,
): GetTransactionRatingsResult => {
	const {data, ...rest} = useGetTransactionRatingsQuery(input, options);

	if (data?.data?.objs) {
		const dataMapper = mapToTransactionRatingsModel(data.data.objs);

		return {
			data: dataMapper,
			pagination: {
				curr_page: data.data.curr_page,
				per_page: data.data.per_page,
				total_objs: data.data.total_objs,
				total_page: data.data.total_page,
			},
			...rest,
		};
	}

	return {
		data: undefined,
		pagination: undefined,
		...rest,
	};
};
