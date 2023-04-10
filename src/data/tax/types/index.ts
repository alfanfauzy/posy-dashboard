import {Metadata} from '@/data/common/types/metadata';

type TaxType = 'TAX_AFTER_DISCOUNT' | 'TAX_INCLUDE_PRICE';

export type TaxSetting = {
	is_service_charge: boolean;
	service_charge_percentage: number;
	is_tax: boolean;
	tax_percentage: number;
	is_service_charge_taxable: boolean;
	tax_type: TaxType;
	updated_at: number | null;
	updated_by: string;
};

export type GetTaxDataResponse = {
	tax_setting: TaxSetting;
};

export type UpdateTaxDataResponse = {
	success: boolean;
	metadata: Metadata;
};
