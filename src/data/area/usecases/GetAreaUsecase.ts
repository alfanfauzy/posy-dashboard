import {
	GetAreaInput,
	GetAreaResult,
} from '@/domain/area/repositories/GetAreaRepository';
import {Response} from '@/domain/vo/BaseResponse';
import {UseQueryOptions} from '@tanstack/react-query';

import {mapToAreaModel} from '../mappers/AreaMapper';
import {useGetAreaQuery} from '../sources/GetAreaQuery';
import {GetAreaDataResponse} from '../types/GetAreaType';

export const useGetAreaUsecase = (
	input: GetAreaInput,
	options?: UseQueryOptions<Response<GetAreaDataResponse>>,
): GetAreaResult => {
	const {data, ...rest} = useGetAreaQuery(input, options);

	if (data?.data) {
		const dataMapper = mapToAreaModel(data.data);

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
