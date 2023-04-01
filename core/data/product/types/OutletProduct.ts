import {Metadata, UpdatedAt} from '@/data/common/types/metadata';

type Category = {
	uuid: string;
	category_name: string;
	is_active: boolean;
};

type Product = {
	uuid: string;
	restaurant_uuid: string;
	product_name: string;
	product_description: string;
	product_image_url: string;
	categories: Array<Category>;
};

type Addon = {
	uuid: string;
	addon_name: string;
	addon_price: number;
	is_optional: boolean;
	can_choose_multiple: boolean;
	min_variant: number;
	max_variant: number;
	variants: Array<Variant>;
};

type Variant = {
	uuid: string;
	variant_name: string;
	variant_priority: number;
	variant_price?: number;
};

type OutletProductBased = {
	product: Product;
	is_show: boolean;
	is_available: boolean;
	is_discount: boolean;
	is_favourite: boolean;
	price: number;
	price_discount: number;
	price_after_discount: number;
	price_discount_percentage: number;
	price_final: number;
	cooking_duration: number;
	metadata: Metadata;
};

export type GetOutletProductsDataResponse = OutletProductBased;

export type GetOutletProductDataResponse = {
	detail: OutletProductBased;
	addons: Array<Addon>;
};

export type UpdateOutletProductStatusDataResponse = {
	success: boolean;
	metadata: {
		updated_at: UpdatedAt;
	};
};

export type UpdateOutletProductDataResponse = {
	success: boolean;
	metadata: {
		updated_at: UpdatedAt;
	};
};
