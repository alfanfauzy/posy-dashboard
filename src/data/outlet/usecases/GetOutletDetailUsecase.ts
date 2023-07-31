import {
	GetOutletDetailPayload,
	GetOutletDetailResult,
} from '@/domain/outlet/repositories/GetOutletDetailRepository';
import {Response} from '@/domain/vo/BaseResponse';
import {UseQueryOptions} from '@tanstack/react-query';

import {mapToOutletDetailModel} from '../mappers/OutletMapper';
import {useGetOutletDetailQuery} from '../sources/GetDetailOutletUserQuery';
import {GetOutletDetailResponse} from '../types/GetOutletDetailType';

export const useGetOutletDetailUsecase = (
	input: GetOutletDetailPayload,
	options?: UseQueryOptions<Response<GetOutletDetailResponse>>,
): GetOutletDetailResult => {
	const {data, ...rest} = useGetOutletDetailQuery(input, options);

	if (data?.data) {
		const dataMapper = mapToOutletDetailModel(data.data);

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
