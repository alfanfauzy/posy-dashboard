import {FilterBased, InputVariables} from '@/domain/vo/BaseInput';
import {Metadata} from '@/domain/vo/BaseMetadata';
import {Pagination} from '@/domain/vo/BasePagination';
import {ResultQuery} from '@/domain/vo/BaseResponse';

import {Product, Products} from '../model';

export type GetOutletProductsInput = InputVariables<
	keyof Metadata,
	| keyof Pick<Product, 'product_name'>
	| keyof {category_uuid: string}
	| keyof FilterBased
>;

export type GetOutletProductsResult = ResultQuery<Products | undefined> & {
	pagination: Pagination | undefined;
};
