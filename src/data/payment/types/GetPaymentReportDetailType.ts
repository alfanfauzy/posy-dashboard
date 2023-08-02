export type GetPaymentReportDetailResponse = {
	id: string;
	reference_id: string;
	reference_detail: {
		type: string;
		code: string;
		created_at: string;
		organization_type: string;
		organization_name: string;
	};
	type: string;
	payment_method: {
		name: string;
		logo_url: string;
		category_name: string;
	};
	currency: string;
	amount: number;
	fee: number;
	fee_detail: {
		charge_fee: number;
		charge_fee_unit: string;
		charge_amount: number;
		vat_amount: number;
		withholding_tax_amount: number;
		third_party_withholding_tax_amount: number;
	};
	net_amount: number;
	cashflow: string;
	status: string;
	settlement_status: string;
	estimated_settlement_time: string;
	metadata: {
		created_at: string;
		updated_at: string;
	};
};
