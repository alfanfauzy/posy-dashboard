import {GetPaymentReportFilter} from '@/domain/payment/repositories/GetPaymentReportList';
import {Response} from '@/domain/vo/BaseResponse';
import {UseInfiniteQueryOptions} from '@tanstack/react-query';

import {useGetPaymentReportQuery} from '../sources/GetPaymentReportListQuery';
import {GetPaymentReportListResponse} from '../types';

export const useGetPaymentReportUsecase = (
	payload: GetPaymentReportFilter,
	options?: UseInfiniteQueryOptions<Response<GetPaymentReportListResponse>>,
) => {
	const {data, ...rest} = useGetPaymentReportQuery(payload, options);

	if (data?.pages) {
		return {
			data: data,
			...rest,
		};
	}

	return {
		data: undefined,
		...rest,
	};
};
