import {ResultQuery} from '@/domain/vo/BaseResponse';

import {PaymentAccountInfo} from '../models';

/**
 * Get Payment Account Info
 */
export type GetPaymentAccountInfoResult = ResultQuery<
	PaymentAccountInfo | undefined
>;
