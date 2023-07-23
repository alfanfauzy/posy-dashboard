import {FilterBased, InputVariables} from '@/domain/vo/BaseInput';
import {Metadata} from '@/domain/vo/BaseMetadata';
import {Pagination} from '@/domain/vo/BasePagination';
import {ResultQuery} from '@/domain/vo/BaseResponse';

import {Reviews} from '../model/review';

export type GetDetailRatingsInput = InputVariables<
	keyof Metadata,
	'created_at' | keyof FilterBased
> & {
	food_rating_uuid: string;
};

export type GetDetailRatingsResult = ResultQuery<Reviews | undefined> & {
	pagination: Pagination | undefined;
};
