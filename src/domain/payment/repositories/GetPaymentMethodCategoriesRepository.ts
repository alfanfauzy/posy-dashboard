/**
 * GET
 */

import {FilterInputVariables} from '@/domain/vo/BaseInput';
import {Pagination} from '@/domain/vo/BasePagination';
import {ResultQuery} from '@/domain/vo/BaseResponse';

import {PaymentMethodCategory, PaymentMethodCategorys} from '../models';

export type GetFilterPaymentMethodCategory = FilterInputVariables<
	'created_at',
	| keyof Pick<PaymentMethodCategory, 'is_integration' | 'is_show'>
	| 'with_payment_method'
> & {restaurant_uuid?: string};

export type GetPaymentMethodCategorysResult = ResultQuery<
	PaymentMethodCategorys | undefined
> & {
	pagination: Pagination | undefined;
};

export type GetPaymentMethodCategoryResult = ResultQuery<PaymentMethodCategory>;
