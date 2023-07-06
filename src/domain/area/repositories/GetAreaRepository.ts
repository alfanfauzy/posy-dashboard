import {Area} from '@/domain/area/model';
import {ResultQuery} from '@/domain/vo/BaseResponse';

export type GetAreaInput = {restaurant_outlet_uuid: string; area_uuid: string};

export type GetAreaResult = ResultQuery<Area | undefined>;
