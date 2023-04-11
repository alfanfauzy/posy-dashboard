import {ResultQuery} from '@/domain/vo/BaseResponse';

import {OutletSelection} from '../models';

export type GetOutletSelectionResult = ResultQuery<OutletSelection | undefined>;
