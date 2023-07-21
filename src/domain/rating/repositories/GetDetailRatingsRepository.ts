import {InputVariables} from '@/domain/vo/BaseInput';
import {Pagination} from '@/domain/vo/BasePagination';
import {ResultQuery} from '@/domain/vo/BaseResponse';

import {Reviews} from '../model/review';

export type GetDetailRatingsInput = InputVariables & {
	food_rating_uuid: string;
};

export type GetDetailRatingsResult = ResultQuery<Reviews | undefined> & {
	pagination: Pagination | undefined;
};
