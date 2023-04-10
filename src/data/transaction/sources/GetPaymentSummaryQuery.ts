import Post from '@/data/common/api/post';
import {GetPaymentSummaryInput} from '@/domain/transaction/repositories/GetPaymentSummaryRepository';
import {Response} from '@/domain/vo/BaseResponse';
import {useQuery, UseQueryOptions} from '@tanstack/react-query';

import {GetPaymentSummaryDataResponse} from '../types/GetPaymentSummaryType';

export const GetPaymentSummaryQueryKey =
	'transactions/payment-summary' as const;

const GetPaymentSummary = async (
	input: GetPaymentSummaryInput,
): Promise<Response<GetPaymentSummaryDataResponse>> => {
	const response = await Post({
		endpoint: `/order-service/transaction/payment/summary/${input?.transaction_uuid}`,
		data: input,
	});

	return {
		code: response?.code,
		data: response?.data,
		message: response?.message,
		more_info: response?.more_info,
	};
};

export const useGetPaymentSummaryQuery = (
	input: GetPaymentSummaryInput,
	options?: UseQueryOptions<Response<GetPaymentSummaryDataResponse>>,
) =>
	useQuery<Response<GetPaymentSummaryDataResponse>>(
		[GetPaymentSummaryQueryKey, input],
		() => GetPaymentSummary(input),
		{
			refetchOnWindowFocus: false,
			...options,
		},
	);
