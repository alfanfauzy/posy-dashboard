import {Categories, Category} from '@/domain/category/model';
import {UpdateCategoryInput} from '@/domain/category/repositories/UpdateCategoryRepository';
import {FormCategoryValidation} from '@/view/category/schema/category-schema';

import {GetCategoriesDataResponse} from '../types';

// map server data to own model
export const mapToCategoriesModel = (
	datas: Array<GetCategoriesDataResponse>,
): Categories =>
	datas.map(data => ({
		uuid: data.uuid,
		category_name: data.category_name,
		is_active: data.is_active,
		restaurant_uuid: data.restaurant_uuid,
	}));

export const mapTopUpdateCategory = (
	data: FormCategoryValidation,
	selectedCategory: Category,
): UpdateCategoryInput => {
	return {
		categoryId: selectedCategory.uuid,
		payload: data,
	};
};
