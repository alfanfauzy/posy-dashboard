import {InputVariables} from '@/domain/vo/BaseInput';
import {Metadata} from '@/domain/vo/BaseMetadata';
import {Pagination} from '@/domain/vo/BasePagination';
import {ResultQuery} from '@/domain/vo/BaseResponse';

import {MenuProducts} from '../model/ProductMenu';
import {Product} from '../model/ProductOutlet';

export type GetMenuProductsInput = InputVariables<
	keyof Metadata,
	keyof Pick<Product, 'product_name'> | 'keyword' | 'category_uuid'
> & {restaurant_outlet_uuid?: string};

export type GetMenuProductsResult = ResultQuery<MenuProducts | undefined> & {
	pagination: Pagination | undefined;
};
