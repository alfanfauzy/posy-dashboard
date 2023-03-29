/**
 * GET
 */

import {Tax, TaxType} from '@/domain/tax/model';
import {Metadata} from '@/domain/vo/BaseMetadata';
import {ResultMutation, ResultQuery} from '@/domain/vo/BaseResponse';

export type GetTaxInput = {
	restaurant_outlet_uuid: string;
};

export type GetTaxResult = ResultQuery<Tax | undefined>;

/**
 * POST
 */

export type UpdateTaxInput = {
	restaurant_outlet_uuid: string;
	is_service_charge: boolean;
	service_charge_percentage: number;
	is_service_charge_taxable: boolean;
	is_tax: boolean;
	tax_percentage: number;
	tax_type: TaxType;
};

export type UpdateOutletProductStatusResult = ResultMutation<
	| {
			success: boolean;
			metadata: Metadata;
	  }
	| undefined
>;

export type UpdateTaxRepository = {
	updateTax(input: UpdateTaxInput): void;
} & UpdateOutletProductStatusResult;
