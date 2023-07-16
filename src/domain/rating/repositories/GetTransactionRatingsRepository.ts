import {InputVariables} from '@/domain/vo/BaseInput';
import {Metadata} from '@/domain/vo/BaseMetadata';
import {Pagination} from '@/domain/vo/BasePagination';
import {ResultQuery} from '@/domain/vo/BaseResponse';

import {Ratings} from '../model';

export type GetTransactionRatingsInput = InputVariables<
	keyof Metadata,
	'created_at'
>;

export type GetTransactionRatingsResult = ResultQuery<Ratings | undefined> & {
	pagination: Pagination | undefined;
};
