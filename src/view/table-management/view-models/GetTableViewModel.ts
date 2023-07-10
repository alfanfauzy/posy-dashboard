import {GetTableDataResponse} from '@/data/table/types/GetTableType';
import {useGetTableUsecase} from '@/data/table/usecases/GetTableUsecase';
import {
	GetTableInput,
	GetTableResult,
} from '@/domain/table/repositories/GetTableRepository';
import {Response} from '@/domain/vo/BaseResponse';
import {UseQueryOptions} from '@tanstack/react-query';

export const useGetTableViewModel = (
	input: GetTableInput,
	options?: UseQueryOptions<Response<GetTableDataResponse>>,
): GetTableResult => {
	const result = useGetTableUsecase(input, options);

	return result;
};
