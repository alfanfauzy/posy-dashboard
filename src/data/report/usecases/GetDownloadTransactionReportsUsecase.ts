import {MutationOptions} from '@/data/common/types';
import {
	GetDownloadReportsRepository,
	GetDownloadTransactionReportInput,
} from '@/domain/report/repositories/GetDownloadReportsRepository';

import {useGetDownloadTransactionReportsMutation} from '../sources/GetDownloadTransactionReportsQuery';

export const useDownloadTransactionReportsUsecase = (
	options?: MutationOptions,
): GetDownloadReportsRepository => {
	const {mutate, data, ...rest} =
		useGetDownloadTransactionReportsMutation(options);

	const downloadReport = (input: GetDownloadTransactionReportInput) => {
		mutate(input);
	};

	return {
		downloadReport,
		data: data?.data,
		...rest,
	};
};
