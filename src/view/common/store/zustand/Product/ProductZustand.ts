import {create} from 'zustand';

type ProductState = {
	[x: string]: any;
	isEdit: boolean;
	selectedProductId: string;
	isOpenForm: boolean;
	isOpenConfirmation: boolean;
};

const useProductState = create<ProductState>(set => ({
	isEdit: false,
	isOpenForm: false,
	isOpenConfirmation: false,
	selectedProductId: '',
	set: (fn: (arg0: ProductState) => ProductState | Partial<ProductState>) =>
		set(state => fn(state)),
}));

export default useProductState;
