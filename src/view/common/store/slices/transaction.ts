/**
 *
 * Transaction reducer
 *
 */
import {Table} from '@/domain/table/model';
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
	selectedTable: Table | null;
	prevTable: Table | null;
};

const initialState: TransactionState = {
	search: '',
	selectedTrxId: '',
	payment: {
		subtotal: 0,
		total: 0,
		discount_percentage: 0,
	},
	selectedTable: null,
	prevTable: null,
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
		onChangeSelectedTable: (
			state,
			action: PayloadAction<{table: Table | null; prevTable?: Table | null}>,
		) => {
			state.selectedTable = action.payload.table;
			if (action.payload.prevTable) {
				state.prevTable = action.payload.prevTable;
			}
		},
	},
});

// export the action from the slice
export const {
	onChangeSearch,
	onClearSearch,
	onChangeSelectedTrxId,
	onChangePayment,
	onChangeSelectedTable,
} = TransactionSlice.actions;

export default TransactionSlice.reducer;
