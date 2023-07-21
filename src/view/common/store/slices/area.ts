import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type SelectedArea = {
	uuid: string;
	name: string;
	table: string;
	size: string;
};

type AreaState = {
	selectedArea: SelectedArea;
};

const initialState: AreaState = {
	selectedArea: {
		name: '',
		uuid: '',
		table: '',
		size: '',
	},
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
	},
});

// export the action from the slice
export const {onChangeArea, onResetArea} = AreaSlice.actions;

export default AreaSlice.reducer;
