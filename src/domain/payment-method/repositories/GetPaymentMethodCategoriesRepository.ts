import {InputVariables} from '@/domain/vo/BaseInput';
import {Metadata} from '@/domain/vo/BaseMetadata';
import {Pagination} from '@/domain/vo/BasePagination';
import {ResultQuery} from '@/domain/vo/BaseResponse';

import {PaymentMethodCategories, PaymentMethodCategory} from '../model';

export type GetPaymentMethodCategoriesInput = InputVariables<
	keyof Metadata,
	keyof Pick<PaymentMethodCategory, 'name'>
>;

export type GetPaymentMethodCategoriesResult = ResultQuery<
	PaymentMethodCategories | undefined
> & {
	pagination: Pagination | undefined;
};
