import {GetOutletSelectionResult} from '@/domain/outlet/repositories/GetOutletSelectionRepository';
import {DataList, Response} from '@/domain/vo/BaseResponse';
import {UseQueryOptions} from '@tanstack/react-query';

import {mapToOutletSelectionModel} from '../mappers/OutletMapper';
import {useGetOutletSelectionQuery} from '../sources/GetOutletSelectionQuery';
import {GetOutletSelectionDataResponse} from '../types/GetOutletSelectionType';

export const useGetOutletSelectionUsecase = (
	options?: UseQueryOptions<Response<DataList<GetOutletSelectionDataResponse>>>,
): GetOutletSelectionResult => {
	const {data, ...rest} = useGetOutletSelectionQuery(options);

	if (data?.data?.objs) {
		const dataMapper = mapToOutletSelectionModel(data.data.objs);

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
