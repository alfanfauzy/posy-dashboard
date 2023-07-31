import {mapToPaymentReportDetailModal} from '@/data/payment/mappers/PaymentMethodMapper';
import {
	GetPaymentReportDetailPayload,
	GetPaymentReportDetailResult,
} from '@/domain/payment/repositories/GetPaymentReportDetail';
import {Response} from '@/domain/vo/BaseResponse';
import {UseQueryOptions} from '@tanstack/react-query';

import {useGetPaymentReportDetailQuery} from '../sources/GetPaymentReportDetailQuery';
import {GetPaymentReportDetailResponse} from '../types/GetPaymentReportDetailType';

export const useGetPaymentReportDetailUsecase = (
	payload: GetPaymentReportDetailPayload,
	options?: UseQueryOptions<Response<GetPaymentReportDetailResponse>>,
): GetPaymentReportDetailResult => {
	const {data, ...rest} = useGetPaymentReportDetailQuery(payload, options);

	if (data?.data) {
		const paymentAccountInfo = mapToPaymentReportDetailModal(data.data);

		return {
			data: paymentAccountInfo,
			...rest,
		};
	}

	return {
		data: undefined,
		...rest,
	};
};
