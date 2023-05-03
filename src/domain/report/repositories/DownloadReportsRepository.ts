import {Search} from '@/domain/vo/BaseInput';
import {ResultMutation} from '@/domain/vo/BaseResponse';

export type DownloadTransactionReports = {
	start_date: string;
	end_date: string;
	filter: Search;
};

export type UpdateOutletProductStatus = string;

export type DownloadReportsResult = ResultMutation<
	UpdateOutletProductStatus | undefined
>;

export type DownloadReportsRepository = {
	downloadReport(input?: DownloadTransactionReports): void;
} & DownloadReportsResult;
