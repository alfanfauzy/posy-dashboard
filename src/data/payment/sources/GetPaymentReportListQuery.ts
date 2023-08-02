import Get from '@/data/common/api/get';
import {GetPaymentReportFilter} from '@/domain/payment/repositories/GetPaymentReportList';
import {Response} from '@/domain/vo/BaseResponse';
import {UseInfiniteQueryOptions, useInfiniteQuery} from '@tanstack/react-query';
import {AxiosError} from 'axios';

import {GetPaymentReportListResponse} from '../types';

export const GetPaymentReportKey = 'payment-report/list';

export const GetPaymentReport = async (
	payload: GetPaymentReportFilter,
): Promise<Response<GetPaymentReportListResponse>> => {
	const {
		end_date,
		restaurant_uuid,
		start_date,
		after_id,
		before_id,
		channel_categories,
		limit,
		statuses,
		types,
	} = payload;

	const newPayload = {
		end_date,
		restaurant_uuid,
		start_date,
		after_id,
		before_id,
		channel_categories,
		limit,
		statuses,
		types,
	};

	try {
		const response = await Get({
			endpoint: `/payment-service/payment/transaction`,
			params: newPayload,
		});

		return response;
	} catch (error) {
		const err = error as AxiosError;
		throw err.response?.data;
	}
};

export const useGetPaymentReportQuery = (
	payload: GetPaymentReportFilter,
	options?: UseInfiniteQueryOptions<Response<GetPaymentReportListResponse>>,
) =>
	useInfiniteQuery<Response<GetPaymentReportListResponse>>(
		[GetPaymentReportKey, JSON.stringify(payload)],
		() => GetPaymentReport(payload),
		{
			...options,
		},
	);
