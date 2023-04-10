export type GetPaymentSummaryDataResponse = {
	subtotal_price: number;
	discount_product_price: number;
	discount_general_percentage: number;
	discount_general_price: number;
	tax_and_charge: TaxAndCharge;
	payment_price: number;
};

export type TaxAndCharge = {
	is_service_charge: boolean;
	service_charge_percentage: number;
	is_service_charge_taxable: boolean;
	service_charge_price: number;
	is_tax: boolean;
	tax_type: TaxType;
	tax_percentage: number;
	tax_price: number;
	tax_and_charge_price: number;
};

type TaxType = 'TAX_AFTER_DISCOUNT' | 'TAX_INCLUDE_PRICE';
