export type PayloadMasterProduct = {
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
	addons: Array<{
		addon_name: string;
		is_optional: boolean;
		can_choose_multiple: boolean;
		priority: number;
		variants: Array<{
			variant_name: string;
			variant_price: number;
			variant_priority: number;
		}>;
	}>;
};
