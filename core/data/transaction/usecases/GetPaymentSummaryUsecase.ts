import {
	GetPaymentSummaryInput,
	GetPaymentSummaryResult,
} from '@/domain/transaction/repositories/GetPaymentSummaryRepository';
import {Response} from '@/domain/vo/BaseResponse';
import {UseQueryOptions} from '@tanstack/react-query';

import {mapToPaymentSummaryModel} from '../mappers/TransactionMapper';
import {useGetPaymentSummaryQuery} from '../sources/GetPaymentSummaryQuery';
import {GetPaymentSummaryDataResponse} from '../types/GetPaymentSummaryType';

export const useGetPaymentSummaryUsecase = (
	input: GetPaymentSummaryInput,
	options?: UseQueryOptions<Response<GetPaymentSummaryDataResponse>>,
): GetPaymentSummaryResult => {
	const {data, ...rest} = useGetPaymentSummaryQuery(input, options);

	if (data?.data) {
		const dataMapper = mapToPaymentSummaryModel(data.data);

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
