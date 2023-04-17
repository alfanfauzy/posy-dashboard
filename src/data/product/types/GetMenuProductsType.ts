type Category = {
	uuid: string;
	category_name: string;
	is_active: boolean;
	restaurant_uuid: string;
};

type Product = {
	uuid: string;
	product_name: string;
	product_description: string;
	product_image_url: string;
	is_favourite: boolean;
	is_discount: boolean;
	is_available: boolean;
	price: number;
	price_discount: number;
	price_after_discount: number;
	price_discount_percentage: number;
	price_final: number;
	cooking_duration: number;
	categories: Array<Category>;
};

type MenuProducts = {
	category_uuid: string;
	category_name: string;
	products: Array<Product>;
};

export type GetMenuProductsDataResponse = MenuProducts;
