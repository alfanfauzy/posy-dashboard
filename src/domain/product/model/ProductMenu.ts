import {Categories} from '@/domain/category/model';

export type MenuProductBased = {
	uuid: string;
	product_name: string;
	product_description: string;
	product_image_url: string;
	price: number;
	price_discount: number;
	price_after_discount: number;
	price_discount_percentage: number;
	price_final: number;
	cooking_duration: number;
	categories: Categories | undefined;
	is_available: boolean;
	is_discount: boolean;
	is_favourite: boolean;
};

export type MenuProducts = Array<{
	category_uuid: string;
	category_name: string;
	products: Array<MenuProductBased>;
}>;
