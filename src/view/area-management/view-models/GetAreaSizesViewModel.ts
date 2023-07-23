import {GetAreaSizesDataResponse} from '@/data/area/types/GetAreaSizesType';
import {useGetAreaSizesUsecase} from '@/data/area/usecases/GetAreaSizesUsecase';
import {
	GetAreaSizesInput,
	GetAreaSizesResult,
} from '@/domain/area/repositories/GetAreaSizesRepository';
import {DataList, Response} from '@/domain/vo/BaseResponse';
import {UseQueryOptions} from '@tanstack/react-query';

export const useGetAreaSizesViewModel = (
	input: GetAreaSizesInput,
	options?: UseQueryOptions<Response<DataList<GetAreaSizesDataResponse>>>,
): GetAreaSizesResult => {
	const result = useGetAreaSizesUsecase(input, options);

	return result;
};
