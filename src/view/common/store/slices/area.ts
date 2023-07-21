import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type SelectedArea = {
	uuid: string;
	name: string;
	table: string;
	size: string;
};

type AreaState = {
	selectedArea: SelectedArea;
	isOpenAddArea: boolean;
	isOpenEditArea: boolean;
	isOpenDeleteArea: boolean;
};

const initialState: AreaState = {
	selectedArea: {
		name: '',
		uuid: '',
		table: '',
		size: '',
	},
	isOpenAddArea: false,
	isOpenEditArea: false,
	isOpenDeleteArea: false,
};

const AreaSlice = createSlice({
	name: 'Area',
	initialState,
	reducers: {
		onChangeArea: (state, action: PayloadAction<SelectedArea>) => {
			state.selectedArea = action.payload;
		},
		onResetArea: state => {
			state.selectedArea = {
				name: '',
				uuid: '',
				table: '',
				size: '',
			};
		},
		onChangeToggleAddArea: (state, action: PayloadAction<boolean>) => {
			state.isOpenAddArea = action.payload;
		},
		onChangeToggleEditArea: (state, action: PayloadAction<boolean>) => {
			state.isOpenEditArea = action.payload;
		},
		onChangeToggleDeleteArea: (state, action: PayloadAction<boolean>) => {
			state.isOpenDeleteArea = action.payload;
		},
	},
});

export const {
	onChangeArea,
	onResetArea,
	onChangeToggleAddArea,
	onChangeToggleEditArea,
	onChangeToggleDeleteArea,
} = AreaSlice.actions;

export default AreaSlice.reducer;
