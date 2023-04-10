import {InputVariables} from '@/domain/vo/BaseInput';
import {Metadata} from '@/domain/vo/BaseMetadata';
import {Pagination} from '@/domain/vo/BasePagination';
import {ResultQuery} from '@/domain/vo/BaseResponse';

import {Product, Products} from '../model';

export type GetMenuProductsInput = InputVariables<
	keyof Metadata,
	keyof Pick<Product, 'product_name'>
> & {restaurant_outlet_uuid: string};

export type GetMenuProductsResult = ResultQuery<Products | undefined> & {
	pagination: Pagination | undefined;
};
