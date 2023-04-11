import {GetOutletUserDataResponse} from '@/data/outlet/types/GetOutletUserType';
import {useGetOutletUserUsecase} from '@/data/outlet/usecases/GetOutletUserUsecase';
import {
	GetOutletUserInput,
	GetOutletUserResult,
} from '@/domain/outlet/repositories/GetOutletUserRepository';
import {DataList, Response} from '@/domain/vo/BaseResponse';
import {UseQueryOptions} from '@tanstack/react-query';

export const useGetOutletUserViewModel = (
	input: GetOutletUserInput,
	options?: UseQueryOptions<Response<DataList<GetOutletUserDataResponse>>>,
): GetOutletUserResult => {
	const result = useGetOutletUserUsecase(input, options);

	return result;
};
