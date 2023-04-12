import {
	GetTableStatusInput,
	GetTableStatusResult,
} from '@/domain/transaction/repositories/GetTableStatusRepository';
import {DataList, Response} from '@/domain/vo/BaseResponse';
import {UseQueryOptions} from '@tanstack/react-query';

import {mapToTableStatusModel} from '../mappers/TransactionMapper';
import {useGetTableStatusQuery} from '../sources/GetTableStatusQuery';
import {GetTableStatusDataResponse} from '../types/GetTableStatusType';

export const useGetTableStatusUsecase = (
	input: GetTableStatusInput,
	options?: UseQueryOptions<Response<DataList<GetTableStatusDataResponse>>>,
): GetTableStatusResult => {
	const {data, ...rest} = useGetTableStatusQuery(input, options);

	if (data?.data) {
		const dataMapper = mapToTableStatusModel(data.data?.objs);

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
