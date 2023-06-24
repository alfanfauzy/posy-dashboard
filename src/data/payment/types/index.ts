import {PaymentMethod} from '@/domain/payment/models';
import {Metadata} from '@/domain/vo/BaseMetadata';

export type GetPaymentMethodCategoryListResponse = {
	uuid: string;
	name: string;
	description: string;
	logo_url: string;
	priority: number;
	is_show: boolean;
	is_integration: boolean;
	payment_method: Array<PaymentMethod>;
};

export type UpdatePaymentMethodCategoryResponse = {
	success: string;
	metadata: Metadata;
};

export type GetPaymentAccountInfoResponse = {
	restaurant_uuid: string;
	account_id: string;
	type: string;
	email: string;
	business_name: string;
	status: string;
};

export type GetPaymentMethodListResponse = {
	uuid: string;
	payment_method_category_uuid: string;
	code: string;
	name: string;
	logo_url: string;
	priority: number;
	is_show: boolean;
	is_integration: boolean;
	integration_code: string;
	charge_fee: string;
	settlement_info: string;
	metadata: Metadata;
};

export type GetPaymentBalanceResponse = {
	total: number;
	cash: number;
	pending: number;
};

export type GetPaymentWithdrawResponse = {
	id: string;
	metadata: {
		created_at: string;
	};
};
