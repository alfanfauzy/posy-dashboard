/**
 * Get Payment Balance
 */

import {ResultQuery} from '@/domain/vo/BaseResponse';

import {PaymentBalance} from '../models';

export type GetPaymentBalanceResult = ResultQuery<PaymentBalance | undefined>;
