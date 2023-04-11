import Get from '@/data/common/api/get';
import {GetOutletUserInput} from '@/domain/outlet/repositories/GetOutletUserRepository';
import {DataList, Response} from '@/domain/vo/BaseResponse';
import {useQuery, UseQueryOptions} from '@tanstack/react-query';

import {GetOutletUserDataResponse} from '../types/GetOutletUserType';

export const GetOutletUserQueryKey = ['OutletUser/list'] as const;

const GetOutletUser = async (
	input: GetOutletUserInput,
): Promise<Response<DataList<GetOutletUserDataResponse>>> => {
	const response = await Get({
		endpoint: `/user-service/outlet/user/get-authorization-user/refund/${input.restaurant_outlet_uuid}`,
	});

	return {
		code: response?.code,
		data: response?.data,
		message: response?.message,
		more_info: response?.more_info,
	};
};

export const useGetOutletUserQuery = (
	input: GetOutletUserInput,
	options?: UseQueryOptions<Response<DataList<GetOutletUserDataResponse>>>,
) =>
	useQuery<Response<DataList<GetOutletUserDataResponse>>>(
		GetOutletUserQueryKey,
		() => GetOutletUser(input),
		{
			refetchOnWindowFocus: false,
			...options,
		},
	);
