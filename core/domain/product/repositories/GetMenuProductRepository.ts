import {ResultQuery} from '@/domain/vo/BaseResponse';

import {Product} from '../model';

export type GetMenuProductInput = {
	product_uuid: string;
	restaurant_outlet_uuid: string;
};

export type GetMenuProductResult = ResultQuery<Product | undefined>;
