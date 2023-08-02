/**
 * Get Payment Method
 */

import {FilterInputVariables} from '@/domain/vo/BaseInput';
import {ResultQuery} from '@/domain/vo/BaseResponse';

import {PaymentMethod, PaymentMethods} from '../models';

export type GetFilterPaymentMethod = FilterInputVariables<
	'created_at',
	| keyof Pick<PaymentMethod, 'is_integration' | 'is_show'>
	| 'show_for_pos'
	| 'show_for_dm'
>;

export type GetPaymentMethodsResult = ResultQuery<PaymentMethods | undefined>;

export type GetPaymentMethodResult = ResultQuery<PaymentMethod>;
