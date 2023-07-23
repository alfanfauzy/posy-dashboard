import {
	GetTableInput,
	GetTableResult,
} from '@/domain/table/repositories/GetTableRepository';
import {Response} from '@/domain/vo/BaseResponse';
import {UseQueryOptions} from '@tanstack/react-query';

import {mapToTableModel} from '../mappers/TableMapper';
import {useGetTableQuery} from '../sources/GetTableQuery';
import {GetTableDataResponse} from '../types/GetTableType';

export const useGetTableUsecase = (
	input: GetTableInput,
	options?: UseQueryOptions<Response<GetTableDataResponse>>,
): GetTableResult => {
	const {data, ...rest} = useGetTableQuery(input, options);

	if (data?.data) {
		const dataMapper = mapToTableModel(data.data);

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
