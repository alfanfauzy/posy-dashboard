import {FilterBased, InputVariables} from '@/domain/vo/BaseInput';
import {ResultQuery} from '@/domain/vo/BaseResponse';

import {CancellationReport, CancellationSummary} from '../model';

export type GetCancellationReportSummaryInput = InputVariables<
	keyof CancellationReport,
	'created_at' | keyof FilterBased | keyof CancellationReport
>;
export type GetCancellationReportSummaryResult = ResultQuery<
	CancellationSummary | undefined
>;
