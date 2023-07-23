import {GetDetailRatingsDataResponse} from '@/data/rating/types/GetDetailRatingsType';
import {useGetDetailRatingsUsecase} from '@/data/rating/usecases/GetDetailRatingsUsecase';
import {
	GetDetailRatingsInput,
	GetDetailRatingsResult,
} from '@/domain/rating/repositories/GetDetailRatingsRepository';
import {DataList, Response} from '@/domain/vo/BaseResponse';
import {UseQueryOptions} from '@tanstack/react-query';

export const useGetDetailRatingsViewModel = (
	input: GetDetailRatingsInput,
	options?: UseQueryOptions<Response<DataList<GetDetailRatingsDataResponse>>>,
): GetDetailRatingsResult => {
	const result = useGetDetailRatingsUsecase(input, options);

	return result;
};
