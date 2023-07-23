/**
 *
 * Auth reducer
 *
 */
import {Login, RefreshToken} from '@/domain/auth/model';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type AuthState = {
	isLoggedIn: boolean;
	isSubscription: boolean;
	authData: Login;
	outletId: string;
	openDrawer: boolean;
};

const initialState: AuthState = {
	isLoggedIn: false,
	isSubscription: false,
	outletId: '',
	authData: {
		user_info: {
			email: '',
			phone: '',
			full_name: '',
			uuid: '',
		},
		token: '',
		refresh_token: '',
		expired_at: 0,
		role: {
			name: '',
			uuid: '',
		},
		accesses: [],
	},
	openDrawer: false,
};

export const AuthSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		onLoginSuccess: (state: AuthState, action: PayloadAction<Login>) => {
			state.isLoggedIn = true;
			state.authData = action.payload;
		},
		onSetCredentials: (
			state: AuthState,
			action: PayloadAction<RefreshToken>,
		) => {
			state.authData.token = action.payload.token;
			state.authData.refresh_token = action.payload.refresh_token;
			state.authData.expired_at = action.payload.expired_at;
		},
		onLogout: (state: AuthState) => {
			state.isSubscription = false;
			state.isLoggedIn = false;
			state.outletId = '';
			state.authData = {
				user_info: {
					email: '',
					phone: '',
					full_name: '',
					uuid: '',
				},
				token: '',
				refresh_token: '',
				expired_at: 0,
				role: {name: '', uuid: ''},
				accesses: [],
			};
		},
		setRestaurantOutletId: (
			state: AuthState,
			action: PayloadAction<string>,
		) => {
			state.outletId = action.payload;
		},
		setIsSubscription: (state: AuthState, action: PayloadAction<boolean>) => {
			state.isSubscription = action.payload;
		},
		setOpenDrawer: (state: AuthState, action: PayloadAction<boolean>) => {
			state.openDrawer = action.payload;
		},
	},
});

export const {
	onLogout,
	onLoginSuccess,
	setRestaurantOutletId,
	setIsSubscription,
	onSetCredentials,
	setOpenDrawer,
} = AuthSlice.actions;

export default AuthSlice.reducer;
