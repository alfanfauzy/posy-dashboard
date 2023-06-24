import {
	GetPaymentAccountInfoResponse,
	GetPaymentBalanceResponse,
	GetPaymentMethodCategoryListResponse,
	GetPaymentMethodListResponse,
} from '@/data/payment/types';
import {
	PaymentAccountInfo,
	PaymentBalance,
	PaymentMethodCategorys,
	PaymentMethods,
} from '@/domain/payment/models';
import {PaymentMethodCategoryPayload} from '@/domain/payment/models/index';

export const mapToPaymentMethodCategoryModel = (
	datas: Array<GetPaymentMethodCategoryListResponse>,
): PaymentMethodCategorys =>
	datas.map(data => ({
		uuid: data.uuid,
		name: data.name,
		logo_url: data.logo_url,
		description: data.description,
		priority: data.priority,
		is_show: data.is_show,
		is_integration: data.is_integration,
		payment_method: data.payment_method.map(el => ({
			code: el.code,
			is_integration: el.is_integration,
			is_show: el.is_show,
			logo_url: el.logo_url,
			name: el.name,
			payment_method_category_uuid: el.payment_method_category_uuid,
			priority: el.priority,
			uuid: el.uuid,
			integration_code: el.integration_code,
			charge_fee: el.charge_fee,
			settlement_info: el.settlement_info,
		})),
	}));

export const mapToPaymentMethodCategoryPayload = (
	datas: PaymentMethodCategoryPayload,
): PaymentMethodCategoryPayload => ({
	payment_method_category: [
		...datas.payment_method_category.map(paymentMethodCategory => ({
			uuid: paymentMethodCategory.uuid,
			is_show: paymentMethodCategory.is_show,
			payment_method: paymentMethodCategory.payment_method.map(
				paymentMethod => ({
					uuid: paymentMethod.uuid,
					is_show: !paymentMethodCategory.is_show
						? false
						: paymentMethod.is_show,
				}),
			),
		})),
	],
});

export const mapToPayemntAccountInfo = (
	data: GetPaymentAccountInfoResponse,
): PaymentAccountInfo => ({
	type: data.type,
	status: data.status,
});

export const mapToPaymentMethod = (
	datas: Array<GetPaymentMethodListResponse>,
): PaymentMethods =>
	datas.map(data => ({
		code: data.code,
		is_integration: data.is_integration,
		is_show: data.is_show,
		logo_url: data.logo_url,
		name: data.name,
		payment_method_category_uuid: data.payment_method_category_uuid,
		priority: data.priority,
		uuid: data.uuid,
		integration_code: data.integration_code,
		charge_fee: data.charge_fee,
		settlement_info: data.settlement_info,
	}));

export const mapToPaymentBalance = (
	data: GetPaymentBalanceResponse,
): PaymentBalance => ({
	cash: data.cash,
	pending: data.pending,
	total: data.total,
});
