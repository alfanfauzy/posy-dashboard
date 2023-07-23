import {GetAreaDataResponse} from '@/data/area/types/GetAreaType';
import {useGetAreaUsecase} from '@/data/area/usecases/GetAreaUsecase';
import {
	GetAreaInput,
	GetAreaResult,
} from '@/domain/area/repositories/GetAreaRepository';
import {Response} from '@/domain/vo/BaseResponse';
import {UseQueryOptions} from '@tanstack/react-query';

export const useGetAreaViewModel = (
	input: GetAreaInput,
	options?: UseQueryOptions<Response<GetAreaDataResponse>>,
): GetAreaResult => {
	const result = useGetAreaUsecase(input, options);

	return result;
};
