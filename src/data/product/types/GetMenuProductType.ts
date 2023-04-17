type Category = {
	uuid: string;
	category_name: string;
	is_active: boolean;
	restaurant_uuid: string;
};

type AddonVariant = {
	uuid: string;
	variant_name: string;
	variant_priority: number;
	variant_price?: number;
};

type Addon = {
	uuid: string;
	addon_name: string;
	addon_price: number;
	is_optional: boolean;
	can_choose_multiple: boolean;
	min_variant: number;
	max_variant: number;
	variants: Array<AddonVariant>;
};

type Product = {
	uuid: string;
	product_name: string;
	product_description: string;
	product_image_url: string;
	restaurant_uuid: string;
	categories: Array<Category>;
};

export type GetMenuProductDataResponse = {
	detail: {
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
		product: Product;
	};
	addons: Array<Addon>;
};
