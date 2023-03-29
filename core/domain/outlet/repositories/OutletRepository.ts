import {ResultQuery} from '@/domain/vo/BaseResponse';

import {OutletSelection} from '../models';

/**
 * GET
 */

export type GetOutletSelectionResult = ResultQuery<OutletSelection | undefined>;
