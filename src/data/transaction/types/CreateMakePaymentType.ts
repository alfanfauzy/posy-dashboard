import {Metadata} from '@/data/common/types/metadata';

export type CreateMakePaymentDataResponse = {
	success: boolean;
	payment_method_category: string;
	payment_method: string;
	total_amount: number;
	paid_amount: number;
	metadata: Metadata;
	transaction_code: string;
};
