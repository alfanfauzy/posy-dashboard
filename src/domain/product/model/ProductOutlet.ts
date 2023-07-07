import {Addons} from '@/domain/addon/model';
import {Categories} from '@/domain/category/model';

type ProductBased = {
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
	is_show: boolean;
};

export type Product = {
	addons?: Addons;
} & ProductBased;

export type Products = Array<ProductBased>;

type ProductMasterBased = {
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
	categories: Array<{value: string; label: string}>;
	restaurant_outlets: Array<{label: string; value: string}>;
	is_available: boolean;
	is_discount: boolean;
	is_favourite: boolean;
	is_show: boolean;
};

export type ProductMaster = {
	addons?: Addons;
} & ProductMasterBased;
