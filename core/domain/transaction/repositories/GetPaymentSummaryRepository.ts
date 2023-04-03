import {Tax} from '@/domain/tax/model';
import {ResultQuery} from '@/domain/vo/BaseResponse';

export type GetPaymentSummaryInput = {
	transaction_uuid: string;
	restaurant_outlet_uuid: string;
};

export type PaymentSummary = {
	subtotal_price: number;
	discount_product_price: number;
	discount_general_percentage: number;
	discount_general_price: number;
	tax_and_charge: Omit<Tax, 'updated_at' | 'updated_by'> & {
		tax_price: number;
		service_charge_price: number;
		tax_and_charge_price: number;
	};
	payment_price: number;
};

export type GetPaymentSummaryResult = ResultQuery<PaymentSummary | undefined>;
