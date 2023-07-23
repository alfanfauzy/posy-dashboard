import {GetTableLayoutByFloorDataResponse} from '@/data/table/types/GetTableLayoutByFloorType';
import {useGetTableLayoutByFloorUsecase} from '@/data/table/usecases/GetTableLayoutByFloorUsecase';
import {
	GetTableLayoutByFloorInput,
	GetTableLayoutByFloorResult,
} from '@/domain/table/repositories/GetTableLayoutByFloorRepository';
import {Response} from '@/domain/vo/BaseResponse';
import {UseQueryOptions} from '@tanstack/react-query';

export const useGetTableLayoutByFloorViewModel = (
	input: GetTableLayoutByFloorInput,
	options?: UseQueryOptions<Response<GetTableLayoutByFloorDataResponse>>,
): GetTableLayoutByFloorResult => {
	const result = useGetTableLayoutByFloorUsecase(input, options);

	return result;
};
