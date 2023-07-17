import {
	GetPaymentAccountInfoResponse,
	GetPaymentBalanceResponse,
	GetPaymentMethodCategoryListResponse,
	GetPaymentMethodListResponse,
	GetPaymentReportListResponse,
} from '@/data/payment/types';
import {
	PaymentAccountInfo,
	PaymentBalance,
	PaymentMethodCategorys,
	PaymentMethods,
} from '@/domain/payment/models';
import {PaymentMethodCategoryPayload} from '@/domain/payment/models/index';
import {PaymentsReport} from '@/domain/payment/models/payment-report';

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

export const mapToPaymentReportList = (
	datas: GetPaymentReportListResponse,
): PaymentsReport => ({
	hasMore: datas?.has_more ?? undefined,
	link: datas?.links[0]?.href ?? [],
	data: datas?.objs.map(obj => ({
		id: obj.id,
		transaction_id: obj.reference_detail.code,
		date: obj.metadata.created_at,
		outlet: obj.reference_detail.organization_name,
		category: obj.reference_detail.type,
		payment_method: obj.payment_method.name,
		ammount_received: obj.net_amount,
		setlement_status: obj.settlement_status,
		amount: obj.amount,
		cashflow: obj.cashflow,
		currency: obj.currency,
		estimated_settlement_time: obj.estimated_settlement_time,
		fee: obj.fee,
		fee_detail: {
			charge_amount: obj.fee_detail?.charge_amount,
			charge_fee: obj.fee_detail?.charge_fee,
			charge_fee_unit: obj.fee_detail?.charge_fee_unit,
			vat_amount: obj.fee_detail?.vat_amount,
		},
		net_amount: obj.net_amount,
		settlement_status: obj.settlement_status,
		status: obj.status,
	})),
});
