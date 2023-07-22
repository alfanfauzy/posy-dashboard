/**
 *
 * Transaction reducer
 *
 */
import {Area} from '@/domain/area/model';
import {Table} from '@/domain/table/model';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type Payment = {
	subtotal: number;
	total: number;
	discount_percentage: number;
};

export type ViewType = 'table' | 'transaction';

export type TransactionState = {
	search: string;
	selectedTrxId: string;
	payment: Payment;
	selectedTable: Table | null;
	prevTable: Table | null;
	viewType: ViewType;
	isOpenNotifBar: boolean;
	isOpenTableCapacity: boolean;
	selectedArea: Area | null;
	status: string;
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
	viewType: 'transaction',
	isOpenNotifBar: false,
	isOpenTableCapacity: false,
	selectedArea: null,
	status: '',
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
			state.prevTable = action.payload.prevTable || null;
		},
		onChangeViewType: (state, action: PayloadAction<ViewType>) => {
			state.viewType = action.payload;
			state.selectedTrxId = '';
		},
		onChangeToggleTableCapacity: (state, action: PayloadAction<boolean>) => {
			state.isOpenTableCapacity = action.payload;
		},
		onChangeToggleNotifBar: (state, action: PayloadAction<boolean>) => {
			state.isOpenNotifBar = action.payload;
		},
		onChangeSelectedArea: (state, action: PayloadAction<Area | null>) => {
			state.selectedArea = action.payload;
		},
		onChangeStatus: (state, action: PayloadAction<string>) => {
			state.status = action.payload;
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
	onChangeViewType,
	onChangeToggleTableCapacity,
	onChangeToggleNotifBar,
	onChangeSelectedArea,
	onChangeStatus,
} = TransactionSlice.actions;

export default TransactionSlice.reducer;
