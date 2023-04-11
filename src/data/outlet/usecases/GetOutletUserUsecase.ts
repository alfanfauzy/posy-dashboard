import {
	GetOutletUserInput,
	GetOutletUserResult,
} from '@/domain/outlet/repositories/GetOutletUserRepository';
import {DataList, Response} from '@/domain/vo/BaseResponse';
import {UseQueryOptions} from '@tanstack/react-query';

import {mapToOutletUserModel} from '../mappers/OutletMapper';
import {useGetOutletUserQuery} from '../sources/GetOutletUserQuery';
import {GetOutletUserDataResponse} from '../types/GetOutletUserType';

export const useGetOutletUserUsecase = (
	input: GetOutletUserInput,
	options?: UseQueryOptions<Response<DataList<GetOutletUserDataResponse>>>,
): GetOutletUserResult => {
	const {data, ...rest} = useGetOutletUserQuery(input, options);

	if (data?.data?.objs) {
		const dataMapper = mapToOutletUserModel(data.data.objs);

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
