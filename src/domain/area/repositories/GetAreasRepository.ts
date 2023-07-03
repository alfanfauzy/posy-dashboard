import {Areas} from '@/domain/area/model';
import {ResultQuery} from '@/domain/vo/BaseResponse';

export type GetAreasInput = {restaurant_outlet_uuid: string};

export type GetAreasResult = ResultQuery<Areas | undefined>;
