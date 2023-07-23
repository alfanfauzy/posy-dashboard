import {Category} from '@/domain/category/model';

import useCategoryState from './CategoryZustand';

type CategoryActions = {
	setIsEdit: (value: boolean) => void;
	setSelectedCategoryId: (value: string) => void;
	setSelectedCategory: (value: Category) => void;
	openForm: () => void;
	closeForm: () => void;
	openConfirmation: () => void;
	closeConfirmation: () => void;
	openDiscard: () => void;
	closeDiscard: () => void;
};

const useCategoryActions = (): CategoryActions => {
	const setAppState = useCategoryState(state => state.set);

	const setIsEdit = (value: boolean) => {
		setAppState(() => ({isEdit: value}));
	};

	const openForm = () => {
		setAppState(() => ({isOpenForm: true}));
	};

	const closeForm = () => {
		setAppState(() => ({isOpenForm: false}));
	};

	const openConfirmation = () => {
		setAppState(() => ({isOpenConfirmation: true}));
	};

	const closeConfirmation = () => {
		setAppState(() => ({isOpenConfirmation: false}));
	};

	const setSelectedCategoryId = (value: string) => {
		setAppState(() => ({selectedCategoryId: value}));
	};

	const setSelectedCategory = (value: Category) => {
		setAppState(() => ({selectedCategory: value}));
	};

	const openDiscard = () => {
		setAppState(() => ({isOpenDiscardModal: true}));
	};

	const closeDiscard = () => {
		setAppState(() => ({isOpenDiscardModal: false}));
	};

	return {
		setIsEdit,
		openForm,
		closeForm,
		openConfirmation,
		closeConfirmation,
		setSelectedCategoryId,
		setSelectedCategory,
		openDiscard,
		closeDiscard,
	};
};

export default useCategoryActions;
