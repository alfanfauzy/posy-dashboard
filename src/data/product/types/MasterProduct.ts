import {Metadata} from '@/data/common/types/metadata';
import {Category} from '@/domain/category/model';
import {Outlet} from '@/domain/outlet/models';

type ProductCategory = Pick<Category, 'uuid' | 'category_name' | 'is_active'>;

type ProductOutlet = Pick<Outlet, 'uuid' | 'restaurant'> & {
	name: string;
	code: string;
};

export type GetListProductDataResponse = {
	uuid: string;
	restaurant_uuid: string;
	product_name: string;
	product_description: string;
	product_image: string;
	product_image_url: string;
	is_available: boolean;
	is_favourite: boolean;
	is_discount: boolean;
	price: number;
	price_discount: number;
	price_after_discount: number;
	price_discount_percentage: number;
	price_final: number;
	cooking_duration: number;
	is_show: boolean;
	categories: Array<Category>;
	restaurant_outlets: Array<ProductOutlet>;
	metadata: Metadata;
};

export type GetDetailProductResponse = {
	product: {
		is_show: boolean;
		uuid: string;
		restaurant_uuid: string;
		product_name: string;
		product_description: string;
		product_image_url: string;
		is_available: boolean;
		is_favourite: boolean;
		is_discount: boolean;
		price: number;
		price_discount: number;
		price_after_discount: number;
		price_discount_percentage: number;
		price_final: number;
		cooking_duration: number;
		categories: Array<ProductCategory>;
		restaurant_outlets: Array<ProductOutlet>;
	};
	addons: Array<{
		uuid: string;
		addon_name: string;
		is_optional: boolean;
		can_choose_multiple: boolean;
		min_variant: number;
		max_variant: number;
		variants: Array<{
			variant_priority: any;
			uuid: string;
			variant_name: string;
			variant_price: number;
		}>;
	}>;
};
