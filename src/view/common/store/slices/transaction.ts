/**
 *
 * Transaction reducer
 *
 */
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type Payment = {
	subtotal: number;
	total: number;
	discount_percentage: number;
};

export type TransactionState = {
	search: string;
	selectedTrxId: string;
	payment: Payment;
};

const initialState: TransactionState = {
	search: '',
	selectedTrxId: '',
	payment: {
		subtotal: 0,
		total: 0,
		discount_percentage: 0,
	},
};

export const TransactionSlice = createSlice({
	name: 'transaction',
	initialState,
	reducers: {
		onChangeSearch: (state, action: PayloadAction<{search: string}>) => {
			const {search} = action.payload;
			state.search = search;
		},
		onClearSearch: state => {
			state.search = '';
		},
		onChangeSelectedTrxId: (state, action: PayloadAction<{id: string}>) => {
			state.selectedTrxId = action.payload.id;
		},
		onChangePayment: (state, action: PayloadAction<{payment: Payment}>) => {
			state.payment = action.payload.payment;
		},
	},
});

// export the action from the slice
export const {
	onChangeSearch,
	onClearSearch,
	onChangeSelectedTrxId,
	onChangePayment,
} = TransactionSlice.actions;

export default TransactionSlice.reducer;
