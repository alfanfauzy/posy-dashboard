import {
	GetDetailRatingsInput,
	GetDetailRatingsResult,
} from '@/domain/rating/repositories/GetDetailRatingsRepository';
import {DataList, Response} from '@/domain/vo/BaseResponse';
import {UseQueryOptions} from '@tanstack/react-query';

import {mapToDetailRatingsModel} from '../mappers/RatingMapper';
import {useGetDetailRatingsQuery} from '../sources/GetDetailRatingsQuery';
import {GetDetailRatingsDataResponse} from '../types/GetDetailRatingsType';

export const useGetDetailRatingsUsecase = (
	input: GetDetailRatingsInput,
	options?: UseQueryOptions<Response<DataList<GetDetailRatingsDataResponse>>>,
): GetDetailRatingsResult => {
	const {data, ...rest} = useGetDetailRatingsQuery(input, options);

	if (data?.data?.objs) {
		const dataMapper = mapToDetailRatingsModel(data.data.objs);

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
