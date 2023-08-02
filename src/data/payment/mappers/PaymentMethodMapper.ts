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
import {PaymentReportDetail} from '@/domain/payment/models/payment-report/GetPaymentReportDetailModel';

import {GetPaymentReportDetailResponse} from '../types/GetPaymentReportDetailType';

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
			uuid: el.uuid,
			code: el.code,
			name: el.name,
			description: el.description,
			logo_url: el.logo_url,
			is_show: el.is_show,
			is_integration: el.is_integration,
			charge_fee: el.charge_fee,
			charge_fee_unit: el.charge_fee_unit,
			show_for_dm: el.show_for_dm,
			show_for_pos: el.show_for_pos,
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
		uuid: data.uuid,
		charge_fee: data.charge_fee,
		charge_fee_unit: data.charge_fee_unit,
		description: data.description,
		show_for_dm: data.show_for_dm,
		show_for_pos: data.show_for_pos,
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
		reference_id: obj.reference_id,
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

export const mapToPaymentReportDetailModal = (
	data: GetPaymentReportDetailResponse,
): PaymentReportDetail => ({
	amount: data.amount,
	cashflow: data.cashflow,
	id: data.id,
	reference_id: data.reference_id,
	reference_detail: {
		type: data.reference_detail.type,
		code: data.reference_detail.code,
		created_at: data.reference_detail.created_at,
		organization_type: data.reference_detail.organization_type,
		organization_name: data.reference_detail.organization_name,
	},
	type: data.type,
	payment_method: {
		name: data.payment_method.name,
		logo_url: data.payment_method.logo_url,
		category_name: data.payment_method.category_name,
	},
	currency: data.currency,
	fee: data.fee,
	fee_detail: {
		charge_fee: data.fee_detail.charge_fee,
		charge_fee_unit: data.fee_detail.charge_fee_unit,
		charge_amount: data.fee_detail.charge_amount,
		vat_amount: data.fee_detail.vat_amount,
		withholding_tax_amount: data.fee_detail.withholding_tax_amount,
		third_party_withholding_tax_amount:
			data.fee_detail.third_party_withholding_tax_amount,
	},
	net_amount: data.net_amount,
	status: data.status,
	settlement_status: data.settlement_status,
	estimated_settlement_time: data.estimated_settlement_time,
	metadata: {
		created_at: data.metadata.created_at,
		updated_at: data.metadata.created_at,
	},
});
