import {Metadata} from '@/domain/vo/BaseMetadata';
import {ResultMutation} from '@/domain/vo/BaseResponse';
import {ValidationSchemaProductOutletType} from '@/view/product/schemas/update-product';

type VariantInput = {
	variant_name: string;
	variant_price: number;
};

type AddonInput = {
	addon_name: string;
	is_optional: boolean;
	can_choose_multiple: boolean;
	// max_variant: number;
	variants: Array<VariantInput>;
};

export type UpdateOutletProductInput = {
	restaurant_outlet_uuid: string;
	product_uuid: string;
	is_favourite: boolean;
	is_available: boolean;
	is_show: boolean;
	price: number;
	price_after_discount: number;
	cooking_duration: number;
	addons: Array<AddonInput>;
};

export type UpdateOutletProduct = {
	success: boolean;
	metadata: Metadata;
};

export type UpdateOutletProductResult = ResultMutation<
	UpdateOutletProduct | undefined
>;

export type UpdateOutletProductDefaultInput = {
	restaurant_outlet_uuid: string;
	product_uuid: string;
};

export type UpdateOutletProductRepository = {
	updateOutletProduct(
		input: ValidationSchemaProductOutletType,
		default_input: UpdateOutletProductDefaultInput,
	): void;
} & UpdateOutletProductResult;
