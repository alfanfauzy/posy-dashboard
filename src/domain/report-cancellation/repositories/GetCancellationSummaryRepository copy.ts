import {FilterBased, InputVariables} from '@/domain/vo/BaseInput';
import {ResultQuery} from '@/domain/vo/BaseResponse';

import {CancellationReport, CancellationSummary} from '../model';

export type GetCancellationReportSummaryInput = InputVariables<
	keyof CancellationReport,
	| keyof Pick<
			CancellationReport,
			'outlet_uuid' | 'status' | 'transaction_start'
	  >
	| keyof FilterBased
>;
export type GetCancellationReportSummaryResult = ResultQuery<
	CancellationSummary | undefined
>;
