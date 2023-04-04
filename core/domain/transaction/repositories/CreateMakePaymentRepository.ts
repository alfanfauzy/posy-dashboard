import {Metadata} from '@/domain/vo/BaseMetadata';
import {ResultMutation} from '@/domain/vo/BaseResponse';

export type CreateMakePaymentInput = {
	restaurant_outlet_uuid: string;
	transaction_uuid: string;
	pay_amount: number;
	payment_method_uuid: string;
	additional_info: string;
};

export type CreateMakePaymentResult = ResultMutation<
	{metadata: Metadata} | undefined
>;

export type CreateMakePaymentRepository = {
	makePayment(input: CreateMakePaymentInput): void;
} & CreateMakePaymentResult;
