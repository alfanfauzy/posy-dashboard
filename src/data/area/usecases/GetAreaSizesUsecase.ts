import {
	GetAreaSizesInput,
	GetAreaSizesResult,
} from '@/domain/area/repositories/GetAreaSizesRepository';
import {DataList, Response} from '@/domain/vo/BaseResponse';
import {UseQueryOptions} from '@tanstack/react-query';

import {mapToAreaSizesModel} from '../mappers/AreaSizeMapper';
import {useGetAreaSizesQuery} from '../sources/GetAreaSizesQuery';
import {GetAreaSizesDataResponse} from '../types/GetAreaSizesType';

export const useGetAreaSizesUsecase = (
	input: GetAreaSizesInput,
	options?: UseQueryOptions<Response<DataList<GetAreaSizesDataResponse>>>,
): GetAreaSizesResult => {
	const {data, ...rest} = useGetAreaSizesQuery(input, options);

	if (data?.data?.objs) {
		const dataMapper = mapToAreaSizesModel(data.data.objs);

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
