import {
	GetAreasInput,
	GetAreasResult,
} from '@/domain/area/repositories/GetAreasRepository';
import {DataList, Response} from '@/domain/vo/BaseResponse';
import {UseQueryOptions} from '@tanstack/react-query';

import {mapToAreasModel} from '../mappers/AreaMapper';
import {useGetAreasQuery} from '../sources/GetAreasQuery';
import {GetAreasDataResponse} from '../types/GetAreasType';

export const useGetAreasUsecase = (
	input: GetAreasInput,
	options?: UseQueryOptions<Response<DataList<GetAreasDataResponse>>>,
): GetAreasResult => {
	const {data, ...rest} = useGetAreasQuery(input, options);

	if (data?.data?.objs) {
		const dataMapper = mapToAreasModel(data.data.objs);

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
