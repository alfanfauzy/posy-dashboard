import {ResultQuery} from '@/domain/vo/BaseResponse';

import {Product} from '../model/ProductOutlet';

export type GetOutletProductInput = {
	product_uuid: string;
	restaurant_outlet_uuid: string;
};

export type GetOutletProductResult = ResultQuery<Product | undefined>;
