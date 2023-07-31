import {GetPaymentReportDetailResponse} from '@/data/payment/types/GetPaymentReportDetailType';
import {useGetPaymentReportDetailUsecase} from '@/data/payment/usecases/GetPaymentReportDetailUsecase';
import {GetPaymentReportDetailPayload} from '@/domain/payment/repositories/GetPaymentReportDetail';
import {Response} from '@/domain/vo/BaseResponse';
import {UseQueryOptions} from '@tanstack/react-query';

export const useGetPaymentReportDetailViewModel = (
	payload: GetPaymentReportDetailPayload,
	options?: UseQueryOptions<Response<GetPaymentReportDetailResponse>>,
) => {
	const result = useGetPaymentReportDetailUsecase(payload, options);

	return result;
};
