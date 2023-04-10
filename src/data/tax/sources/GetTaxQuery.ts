import Get from '@/data/common/api/get';
import {GetTaxInput} from '@/domain/tax/repositories/TaxRepository';
import {Response} from '@/domain/vo/BaseResponse';
import {useQuery, UseQueryOptions} from '@tanstack/react-query';

import {GetTaxDataResponse} from '../types';

export const GetTaxQueryKey = 'tax' as const;

const GetTax = async (
	input: GetTaxInput,
): Promise<Response<GetTaxDataResponse>> => {
	const response = await Get({
		endpoint: `/user-service/outlet/setting/tax/${input.restaurant_outlet_uuid}`,
	});

	return {
		code: response?.code,
		data: response?.data,
		message: response?.message,
		more_info: response?.more_info,
	};
};

export const useGetTaxQuery = (
	input: GetTaxInput,
	options?: UseQueryOptions<Response<GetTaxDataResponse>>,
) =>
	useQuery<Response<GetTaxDataResponse>>(
		[GetTaxQueryKey, input],
		() => GetTax(input),
		{
			refetchOnWindowFocus: false,
			...options,
		},
	);
