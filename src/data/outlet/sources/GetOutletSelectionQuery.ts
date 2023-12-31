import Get from '@/data/common/api/get';
import {DataList, Response} from '@/domain/vo/BaseResponse';
import {useQuery, UseQueryOptions} from '@tanstack/react-query';

import {GetOutletSelectionDataResponse} from '../types/GetOutletSelectionType';

export const GetOutletSelectionQueryKey = 'OutletSelection/list' as const;

const GetOutletSelection = async (): Promise<
	Response<DataList<GetOutletSelectionDataResponse>>
> => {
	const response = await Get({
		endpoint: '/user-service/outlet/get-outlet-selection',
	});

	return {
		code: response?.code,
		data: response?.data,
		message: response?.message,
		more_info: response?.more_info,
	};
};

export const useGetOutletSelectionQuery = (
	options?: UseQueryOptions<Response<DataList<GetOutletSelectionDataResponse>>>,
) =>
	useQuery<Response<DataList<GetOutletSelectionDataResponse>>>(
		[GetOutletSelectionQueryKey],
		GetOutletSelection,
		{
			refetchOnWindowFocus: false,
			...options,
		},
	);
