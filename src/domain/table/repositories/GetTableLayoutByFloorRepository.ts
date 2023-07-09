import {ResultQuery} from '@/domain/vo/BaseResponse';

import {TableLayout} from '../model/TableLayout';

export type GetTableLayoutByFloorInput = {
	restaurant_outlet_uuid: string;
	area_uuid: string;
};

export type GetTableLayoutByFloorResult = ResultQuery<TableLayout | undefined>;
