import {Area} from '@/domain/area/model';
import {Table} from '@/domain/table/model';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type AddTablePayload = {
	position_x: number;
	position_y: number;
	floor_area_uuid: string;
} | null;

type TableState = {
	selectedTable: Table | null;
	selectedArea: Area | null;
	isEditLayout: boolean;
	addTable: {
		isOpen: boolean;
		payload: AddTablePayload;
	};
};

const initialState: TableState = {
	selectedTable: null,
	selectedArea: null,
	isEditLayout: false,
	addTable: {
		isOpen: false,
		payload: null,
	},
};

const TableSlice = createSlice({
	name: 'Table',
	initialState,
	reducers: {
		onChangeSelectedArea: (state, action: PayloadAction<Area>) => {
			state.selectedArea = action.payload;
			state.selectedTable = null;
		},
		onChangeSelectedTable: (state, action: PayloadAction<Table | null>) => {
			state.selectedTable = action.payload;
		},
		onOpenEditLayout: state => {
			state.isEditLayout = true;
		},
		onCloseEditLayout: state => {
			state.isEditLayout = false;
		},
		onOpenAddTable: (state, action: PayloadAction<AddTablePayload>) => {
			state.addTable.isOpen = true;
			state.addTable.payload = action.payload;
		},
		onCloseAddTable: state => {
			state.addTable.isOpen = false;
			state.addTable.payload = null;
		},
	},
});

export const {
	onChangeSelectedArea,
	onChangeSelectedTable,
	onOpenEditLayout,
	onCloseEditLayout,
	onOpenAddTable,
	onCloseAddTable,
} = TableSlice.actions;

export default TableSlice.reducer;
