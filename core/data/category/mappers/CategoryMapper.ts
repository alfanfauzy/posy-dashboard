import {Categories} from '@/domain/category/model';

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
