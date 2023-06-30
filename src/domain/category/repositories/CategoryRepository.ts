import {Categories, Category} from '@/domain/category/model';
import {InputVariables} from '@/domain/vo/BaseInput';
import {Metadata} from '@/domain/vo/BaseMetadata';
import {Pagination} from '@/domain/vo/BasePagination';
import {ResultQuery} from '@/domain/vo/BaseResponse';

/**
 * GET
 */

export type GetCategoriesInput = InputVariables<
	keyof Category | keyof Metadata,
	keyof Pick<Category, 'uuid'> | 'keyword'
>;

export type GetCategoriesResult = ResultQuery<Categories | undefined> & {
	pagination: Pagination | undefined;
};
