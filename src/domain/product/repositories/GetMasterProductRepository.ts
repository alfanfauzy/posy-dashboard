import {ResultQuery} from '@/domain/vo/BaseResponse';

import {Product} from '../model/ProductOutlet';

export type GetMasterProductResult = ResultQuery<Product | undefined>;
