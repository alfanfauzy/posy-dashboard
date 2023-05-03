import {InputVariables} from '@/domain/vo/BaseInput';
import {ResultMutation} from '@/domain/vo/BaseResponse';

import {Report} from '../model';

export type GetDownloadTransactionReportInput = InputVariables<
	unknown,
	keyof Pick<
		Report,
		'payment_method_uuid' | 'transaction_category' | 'payment_method_uuid'
	>
> & {
	start_date: string;
	end_date: string;
};

export type DownloadReportsResult = string;

export type GetDownloadReportsResult = ResultMutation<
	DownloadReportsResult | undefined
>;

export type GetDownloadReportsRepository = {
	downloadReport(input: GetDownloadTransactionReportInput): void;
} & GetDownloadReportsResult;
