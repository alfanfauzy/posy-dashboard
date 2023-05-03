import {MutationOptions} from '@/data/common/types';
import {
	DownloadReportsRepository,
	DownloadTransactionReports,
} from '@/domain/report/repositories/DownloadReportsRepository';

import {useGetDownloadTransactionReportsMutation} from '../sources/GetDownloadTransactionReportsQuery';

export const useDownloadTransactionReportsUsecase = (
	options?: MutationOptions,
): DownloadReportsRepository => {
	const {mutate, data, ...rest} =
		useGetDownloadTransactionReportsMutation(options);

	const downloadReport = (input?: DownloadTransactionReports) => {
		mutate(input);
	};

	return {
		downloadReport,
		data: data?.data,
		...rest,
	};
};
