import {ResultQuery} from '@/domain/vo/BaseResponse';

import {OutletDetail} from '../models/GetOutletDetailModel';

export type GetOutletDetailPayload = {
	restaurant_outlet_uuid: string;
};

export type GetOutletDetailResult = ResultQuery<OutletDetail | undefined>;
