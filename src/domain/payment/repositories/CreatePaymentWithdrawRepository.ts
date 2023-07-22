import {GetPaymentWithdrawResponse} from '@/data/payment/types';
import {PaymentWithdrawPayload} from '@/domain/payment/models';
import {ResultMutation} from '@/domain/vo/BaseResponse';

/**
 * Payment Withdraw
 */

export type CreatePaymentWithdrawResult =
	ResultMutation<GetPaymentWithdrawResponse>;

export type CreatePaymentWithdrawRepository = {
	createPaymentWithdraw(payload: PaymentWithdrawPayload): void;
} & CreatePaymentWithdrawResult;
