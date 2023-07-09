import {
	GetTableLayoutByFloorInput,
	GetTableLayoutByFloorResult,
} from '@/domain/table/repositories/GetTableLayoutByFloorRepository';
import {Response} from '@/domain/vo/BaseResponse';
import {UseQueryOptions} from '@tanstack/react-query';

import {mapToTableLayoutModel} from '../mappers/TableMapper';
import {useGetTableLayoutByFloorQuery} from '../sources/GetTableLayoutByFloorQuery';
import {GetTableLayoutByFloorDataResponse} from '../types/GetTableLayoutByFloorType';

export const useGetTableLayoutByFloorUsecase = (
	input: GetTableLayoutByFloorInput,
	options?: UseQueryOptions<Response<GetTableLayoutByFloorDataResponse>>,
): GetTableLayoutByFloorResult => {
	const {data, ...rest} = useGetTableLayoutByFloorQuery(input, options);

	if (data?.data) {
		const dataMapper = mapToTableLayoutModel(data.data);

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
