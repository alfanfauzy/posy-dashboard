import {MutationOptions} from '@/data/common/types';
import {useDownloadTransactionReportsUsecase} from '@/data/report/usecases/GetDownloadTransactionReportsUsecase';
import {DownloadReportsRepository} from '@/domain/report/repositories/DownloadReportsRepository';

export const useDownloadTransactionReportsViewModel = (
	options?: MutationOptions,
): DownloadReportsRepository => {
	const result = useDownloadTransactionReportsUsecase(options);

	return result;
};
