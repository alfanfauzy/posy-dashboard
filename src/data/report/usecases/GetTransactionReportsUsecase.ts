import {
	GetTransactionReportsInput,
	GetTransactionReportsResult,
} from '@/domain/report/repositories/GetTransactionReportsRepository';
import {DataList, Response} from '@/domain/vo/BaseResponse';
import {UseQueryOptions} from '@tanstack/react-query';

import {mapToTransactionReportsModel} from '../mappers/ReportMapper';
import {useGetTransactionReportsQuery} from '../sources/GetTransactionReportsQuery';
import {GetTransactionReportsDataResponse} from '../types/GetTransactionReportsType';

export const useGetTransactionReportsUsecase = (
	input?: GetTransactionReportsInput,
	options?: UseQueryOptions<
		Response<DataList<GetTransactionReportsDataResponse>>
	>,
): GetTransactionReportsResult => {
	const {data, ...rest} = useGetTransactionReportsQuery(input, options);

	if (data?.data?.objs) {
		const dataMapper = mapToTransactionReportsModel(data.data.objs);

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
