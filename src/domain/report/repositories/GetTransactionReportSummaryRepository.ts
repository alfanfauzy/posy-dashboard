import {FilterBased, InputVariables} from '@/domain/vo/BaseInput';
import {ResultQuery} from '@/domain/vo/BaseResponse';

import {Report, ReportSummary} from '../model';

export type GetTransactionReportSummaryInput = InputVariables<
	keyof Report,
	| keyof Pick<Report, 'payment_method_uuid' | 'status' | 'created_at'>
	| 'date'
	| keyof FilterBased
>;
export type GetTransactionReportSummaryResult = ResultQuery<
	ReportSummary | undefined
>;
