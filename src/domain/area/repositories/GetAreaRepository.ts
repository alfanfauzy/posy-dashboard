import {Area} from '@/domain/area/model';
import {ResultQuery} from '@/domain/vo/BaseResponse';

export type GetAreaInput = {
	restaurant_outlet_uuid: string;
	area_uuid: string;
	with_table: boolean;
};

export type GetAreaResult = ResultQuery<Area | undefined>;
