import useCategoryState from './ProductZustand';

type ProductActions = {
	setIsEdit: (value: boolean) => void;
	setSelectedProductId: (value: string) => void;
	openForm: () => void;
	closeForm: () => void;
	openConfirmation: () => void;
	closeConfirmation: () => void;
};

const useProductActions = (): ProductActions => {
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

	const setSelectedProductId = (value: string) => {
		setAppState(() => ({selectedCategoryId: value}));
	};

	return {
		setIsEdit,
		openForm,
		closeForm,
		openConfirmation,
		closeConfirmation,
		setSelectedProductId,
	};
};

export default useProductActions;
