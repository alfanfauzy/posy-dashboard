import {ResultQuery} from '@/domain/vo/BaseResponse';

import {Table} from '../model';

export type GetTableInput = {
	table_uuid: string;
};

export type GetTableResult = ResultQuery<Table | undefined>;
