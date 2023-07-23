import {GetAreasDataResponse} from '@/data/area/types/GetAreasType';
import {useGetAreasUsecase} from '@/data/area/usecases/GetAreasUsecase';
import {
	GetAreasInput,
	GetAreasResult,
} from '@/domain/area/repositories/GetAreasRepository';
import {DataList, Response} from '@/domain/vo/BaseResponse';
import {UseQueryOptions} from '@tanstack/react-query';

export const useGetAreasViewModel = (
	input: GetAreasInput,
	options?: UseQueryOptions<Response<DataList<GetAreasDataResponse>>>,
): GetAreasResult => {
	const result = useGetAreasUsecase(input, options);

	return result;
};
