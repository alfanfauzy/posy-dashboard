import {Area} from '@/domain/area/model';
import {CreateCancelTransactionInput} from '@/domain/transaction/repositories/CreateCancelTransactionRepository';
import {MakePayment} from '@/domain/transaction/repositories/CreateMakePaymentRepository';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type Payment = {
	subtotal: number;
	total: number;
	discount_percentage: number;
};

export type ViewType = 'table' | 'transaction';

export type TransactionTabsType = 'order' | 'payment';

export type TransactionState = {
	search: string;
	selectedTrxId: string;
	payment: Payment;
	viewType: ViewType;
	isOpenNotifBar: boolean;
	isOpenTableCapacity: boolean;
	selectedArea: Area | null;
	status: string;
	isOpenCreateTransaction: boolean;
	createTransactionFromTableView: {
		isOpen: boolean;
		isEdit: boolean;
		table_uuid: string;
	};
	cancelTransaction: {
		isOpen: boolean;
		payload: CreateCancelTransactionInput | null;
	};
	isOpenCreatePayment: boolean;
	paymentSuccess: {
		isOpen: boolean;
		payload: MakePayment | null;
	};
	isApplyDiscount: boolean;
	transactionTab: TransactionTabsType;
};

const initialState: TransactionState = {
	search: '',
	selectedTrxId: '',
	payment: {
		subtotal: 0,
		total: 0,
		discount_percentage: 0,
	},
	// selectedTable: null,
	viewType: 'transaction',
	isOpenNotifBar: false,
	isOpenTableCapacity: false,
	selectedArea: null,
	status: '',
	isOpenCreateTransaction: false,
	createTransactionFromTableView: {
		isOpen: false,
		isEdit: false,
		table_uuid: '',
	},
	cancelTransaction: {
		isOpen: false,
		payload: null,
	},
	isOpenCreatePayment: false,
	paymentSuccess: {
		isOpen: false,
		payload: null,
	},
	isApplyDiscount: false,
	transactionTab: 'order',
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
			if (action.payload.id !== '') {
				state.isOpenNotifBar = false;
			}
			state.payment = {
				subtotal: 0,
				total: 0,
				discount_percentage: 0,
			};
		},
		onChangePayment: (state, action: PayloadAction<{payment: Payment}>) => {
			state.payment = action.payload.payment;
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
			if (action.payload) {
				state.selectedTrxId = '';
			}
		},
		onChangeSelectedArea: (state, action: PayloadAction<Area | null>) => {
			state.selectedArea = action.payload;
		},
		onChangeStatus: (state, action: PayloadAction<string>) => {
			state.status = action.payload;
		},
		onChangeIsOpenCreateTransaction: (
			state,
			action: PayloadAction<boolean>,
		) => {
			state.isOpenCreateTransaction = action.payload;
		},
		onChangeIsOpenCreateTransactionFromTableView: (
			state,
			action: PayloadAction<{
				isOpen: boolean;
				isEdit: boolean;
				table_uuid: string;
			}>,
		) => {
			state.createTransactionFromTableView = action.payload;
		},
		onChangeCancelTransaction: (
			state,
			action: PayloadAction<{
				isOpen: boolean;
				payload: CreateCancelTransactionInput | null;
			}>,
		) => {
			state.cancelTransaction = action.payload;
		},
		onChangeIsOpenCreatePayment: (state, action: PayloadAction<boolean>) => {
			state.isOpenCreatePayment = action.payload;
		},
		onChangePaymentSuccess: (
			state,
			action: PayloadAction<{
				isOpen: boolean;
				payload: MakePayment | null;
			}>,
		) => {
			state.paymentSuccess = action.payload;
		},
		onChangeIsApplyDiscount: (state, action: PayloadAction<boolean>) => {
			state.isApplyDiscount = action.payload;
		},
		onChangeTransactionTab: (
			state,
			action: PayloadAction<TransactionTabsType>,
		) => {
			state.transactionTab = action.payload;
		},
	},
});

// export the action from the slice
export const {
	onChangeSearch,
	onClearSearch,
	onChangeSelectedTrxId,
	onChangePayment,
	onChangeViewType,
	onChangeToggleTableCapacity,
	onChangeToggleNotifBar,
	onChangeSelectedArea,
	onChangeStatus,
	onChangeIsOpenCreateTransaction,
	onChangeIsOpenCreateTransactionFromTableView,
	onChangeCancelTransaction,
	onChangeIsOpenCreatePayment,
	onChangePaymentSuccess,
	onChangeIsApplyDiscount,
	onChangeTransactionTab,
} = TransactionSlice.actions;

export default TransactionSlice.reducer;
