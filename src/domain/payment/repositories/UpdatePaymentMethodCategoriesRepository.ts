/**
 * UPDATE
 */

import {UpdatePaymentMethodCategoryResponse} from '@/data/payment/types';
import {ResultMutation} from '@/domain/vo/BaseResponse';

import {
	PaymentMethodCategoryByRestaurantPayload,
	PaymentMethodCategoryPayload,
} from '../models';

export type UpdatePaymentMethodCategoryParams = PaymentMethodCategoryPayload;

export type UpdatePaymentMethodCategoryResult =
	ResultMutation<UpdatePaymentMethodCategoryResponse>;

export type UpdatePaymentMethodCategoryRepository = {
	updatePaymentMethodCategory(
		payload: PaymentMethodCategoryByRestaurantPayload,
	): void;
} & UpdatePaymentMethodCategoryResult;
