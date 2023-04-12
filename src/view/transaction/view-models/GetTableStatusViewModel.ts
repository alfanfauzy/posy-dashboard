import {GetTableStatusDataResponse} from '@/data/transaction/types/GetTableStatusType';
import {useGetTableStatusUsecase} from '@/data/transaction/usecases/GetTableStatusUsecase';
import {
	GetTableStatusInput,
	GetTableStatusResult,
} from '@/domain/transaction/repositories/GetTableStatusRepository';
import {DataList, Response} from '@/domain/vo/BaseResponse';
import {UseQueryOptions} from '@tanstack/react-query';

export const useGetTableStatusViewModel = (
	input: GetTableStatusInput,
	options?: UseQueryOptions<Response<DataList<GetTableStatusDataResponse>>>,
): GetTableStatusResult => {
	const result = useGetTableStatusUsecase(input, options);

	return result;
};
