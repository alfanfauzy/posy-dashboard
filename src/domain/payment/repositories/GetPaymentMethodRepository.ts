/**
 * Get Payment Method
 */

import {FilterInputVariables} from '@/domain/vo/BaseInput';
import {Pagination} from '@/domain/vo/BasePagination';
import {ResultQuery} from '@/domain/vo/BaseResponse';

import {PaymentMethod, PaymentMethods} from '../models';

export type GetFilterPaymentMethod = FilterInputVariables<
	'created_at',
	| keyof Pick<PaymentMethod, 'is_integration' | 'is_show'>
	| 'with_payment_method'
	| 'restaurant_uuid'
>;

export type GetPaymentMethodsResult = ResultQuery<
	PaymentMethods | undefined
> & {
	pagination: Pagination | undefined;
};

export type GetPaymentMethodResult = ResultQuery<PaymentMethod>;
