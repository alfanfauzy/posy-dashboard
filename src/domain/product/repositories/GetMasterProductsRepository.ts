import {FilterInputVariables} from '@/domain/vo/BaseInput';
import {Pagination} from '@/domain/vo/BasePagination';
import {ResultQuery} from '@/domain/vo/BaseResponse';

import {Product, Products} from '../model/ProductOutlet';

export type GetMasterProductsInput = FilterInputVariables<
	'created_at',
	keyof Pick<Product, 'uuid'> | 'keyword' | 'category_uuid'
>;

export type GetMasterProductsResult = ResultQuery<Products | undefined> & {
	pagination: Pagination | undefined;
};
