import {ResultMutation} from '@/domain/vo/BaseResponse';

export type CreateMakePaymentInput = {
	restaurant_outlet_uuid: string;
	transaction_uuid: string;
	pay_amount: number;
	payment_method_uuid: string;
	additional_info: string;
};

export type MakePayment = {
	success: boolean;
	payment_method_category: string;
	transaction_code: string;
	payment_method: string;
	total_amount: number;
	paid_amount: number;
	metadata: {
		updated_at: number;
	};
};
export type CreateMakePaymentResult = ResultMutation<MakePayment | undefined>;

export type CreateMakePaymentRepository = {
	makePayment(input: CreateMakePaymentInput): void;
} & CreateMakePaymentResult;
