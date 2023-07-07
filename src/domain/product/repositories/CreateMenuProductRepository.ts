import {Metadata} from '@/domain/vo/BaseMetadata';
import {ResultMutation} from '@/domain/vo/BaseResponse';

export type AddonVariants = {
	variant_name: string;
	variant_price: number;
	variant_priority: number;
};

export type Addons = {
	addon_name: string;
	is_optional: boolean;
	can_choose_multiple: boolean;
	priority: number;
	variants: Array<AddonVariants>;
};

export type CreateProductInput = {
	restaurant_outlet_uuids: Array<string>;
	category_uuids: Array<string>;
	product_name: string;
	product_description: string;
	product_image_url: string;
	is_favourite: boolean;
	is_available: boolean;
	is_show: boolean;
	price: number;
	price_after_discount: number;
	cooking_duration: number;
	addons: Array<Addons>;
};

export type CreateProductResponse = {uuid: string; metadata: Metadata};

export type CreateProductResult = ResultMutation<null | undefined>;

export type CreateProductRepository = {
	createProduct(input: CreateProductInput): void;
} & CreateProductResult;
