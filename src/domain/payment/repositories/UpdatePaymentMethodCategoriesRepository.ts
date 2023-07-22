/**
 * UPDATE
 */

import {UpdatePaymentMethodCategoryResponse} from '@/data/payment/types';
import {ResultMutation} from '@/domain/vo/BaseResponse';

import {PaymentMethodCategoryPayload} from '../models';

export type UpdatePaymentMethodCategoryParams = PaymentMethodCategoryPayload;

export type UpdatePaymentMethodCategoryResult =
	ResultMutation<UpdatePaymentMethodCategoryResponse>;

export type UpdatePaymentMethodCategoryRepository = {
	updatePaymentMethodCategory(payload: UpdatePaymentMethodCategoryParams): void;
} & UpdatePaymentMethodCategoryResult;
