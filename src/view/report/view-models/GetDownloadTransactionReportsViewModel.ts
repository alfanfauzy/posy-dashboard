import {MutationOptions} from '@/data/common/types';
import {useDownloadTransactionReportsUsecase} from '@/data/report/usecases/GetDownloadTransactionReportsUsecase';
import {GetDownloadReportsRepository} from '@/domain/report/repositories/GetDownloadReportsRepository';

export const useDownloadTransactionReportsViewModel = (
	options?: MutationOptions,
): GetDownloadReportsRepository => {
	const result = useDownloadTransactionReportsUsecase(options);

	return result;
};
