import {create} from 'zustand';

type CategoryState = {
	[x: string]: any;
	isEdit: boolean;
	selectedCategoryId: string;
	selectedCategory: {
		category_name: string;
		is_active: boolean;
		uuid: string;
		restaurant_uuid: string;
	};
	isOpenForm: boolean;
	isOpenConfirmation: boolean;
};

const initialSelectedCategory = {
	category_name: '',
	is_active: false,
	uuid: '',
	restaurant_uuid: '',
};

const useCategoryState = create<CategoryState>(set => ({
	isEdit: false,
	isOpenForm: false,
	isOpenConfirmation: false,
	selectedCategoryId: '',
	selectedCategory: initialSelectedCategory,
	set: (fn: (arg0: CategoryState) => CategoryState | Partial<CategoryState>) =>
		set(state => fn(state)),
}));

export default useCategoryState;
