import {GetPaymentReportListResponse} from '@/data/payment/types';
import {useGetPaymentReportUsecase} from '@/data/payment/usecases/GetPaymentReportListUsecase';
import {GetPaymentReportFilter} from '@/domain/payment/repositories/GetPaymentReportList';
import {Response} from '@/domain/vo/BaseResponse';
import {UseInfiniteQueryOptions} from '@tanstack/react-query';

export const useGetPaymentReportViewModel = (
	payload: GetPaymentReportFilter,
	options?: UseInfiniteQueryOptions<Response<GetPaymentReportListResponse>>,
) => {
	const result = useGetPaymentReportUsecase(payload, options);

	return result;
};
