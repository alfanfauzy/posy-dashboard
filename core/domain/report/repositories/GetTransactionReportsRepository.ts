import {FilterBased, InputVariables} from '@/domain/vo/BaseInput';
import {Pagination} from '@/domain/vo/BasePagination';
import {ResultQuery} from '@/domain/vo/BaseResponse';

import {Report, Reports} from '../model';

export type GetTransactionReportsInput = InputVariables<
	keyof Report,
	keyof Pick<Report, 'payment_method_uuid' | 'status'> | keyof FilterBased
>;

export type GetTransactionReportsResult = ResultQuery<Reports | undefined> & {
	pagination: Pagination | undefined;
};
