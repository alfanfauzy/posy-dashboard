import {GetOutletDetailResponse} from '@/data/outlet/types/GetOutletDetailType';
import {useGetOutletDetailUsecase} from '@/data/outlet/usecases/GetOutletDetailUsecase';
import {
	GetOutletDetailPayload,
	GetOutletDetailResult,
} from '@/domain/outlet/repositories/GetOutletDetailRepository';
import {Response} from '@/domain/vo/BaseResponse';
import {UseQueryOptions} from '@tanstack/react-query';

export const useGetOutletDetailViewModel = (
	input: GetOutletDetailPayload,
	options?: UseQueryOptions<Response<GetOutletDetailResponse>>,
): GetOutletDetailResult => {
	const result = useGetOutletDetailUsecase(input, options);

	return result;
};
