import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type GeneralSettingsState = {
	showDigitalMenu: boolean;
};

const initialState: GeneralSettingsState = {
	showDigitalMenu: true,
};

const GeneralSettingsSlice = createSlice({
	name: 'general-settings',
	initialState,
	reducers: {
		onChangeShowDigitalMenu: (state, action: PayloadAction<boolean>) => {
			state.showDigitalMenu = action.payload;
		},
	},
});

// export the action from the slice
export const {onChangeShowDigitalMenu} = GeneralSettingsSlice.actions;

export default GeneralSettingsSlice.reducer;
