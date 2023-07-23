import {ResultQuery} from '@/domain/vo/BaseResponse';

import {AreaSizes} from '../model/AreaSize';

export type GetAreaSizesInput = {type: 'GRID' | 'CANVAS'};

export type GetAreaSizesResult = ResultQuery<AreaSizes | undefined>;
