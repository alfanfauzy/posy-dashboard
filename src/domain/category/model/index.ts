type CategoryBased = {
	uuid: string;
	category_name: string;
	is_active: boolean;
	restaurant_uuid?: string;
};

export type Category = CategoryBased;

export type Categories = Array<CategoryBased>;
