import {FilterBased, InputVariables} from '@/domain/vo/BaseInput';
import {Pagination} from '@/domain/vo/BasePagination';
import {ResultQuery} from '@/domain/vo/BaseResponse';

import {CancellationReport, CancellationReports} from '../model';

export type GetCancellationReportsInput = InputVariables<
	keyof CancellationReport,
	| keyof Pick<
			CancellationReport,
			'outlet_uuid' | 'status' | 'transaction_start'
	  >
	| keyof FilterBased
>;

export type GetCancellationReportsResult = ResultQuery<
	CancellationReports | undefined
> & {
	pagination: Pagination | undefined;
};
