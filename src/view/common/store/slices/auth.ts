/**
 *
 * Auth reducer
 *
 */
import {Login} from '@/domain/auth/model';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type AuthState = {
	isLoggedIn: boolean;
	isSubscription: boolean;
	authData: Login;
	showSidebar: boolean;
	outletId: string;
};

const initialState: AuthState = {
	isLoggedIn: false,
	isSubscription: false,
	showSidebar: false,
	outletId: '',
	authData: {
		user_info: {
			email: '',
			phone: '',
			fullname: '',
			user_uuid: '',
		},
		token: '',
		refresh_token: '',
		expired_at: 0,
	},
};

export const AuthSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		onLoginSuccess: (state: AuthState, action: PayloadAction<Login>) => {
			state.isLoggedIn = true;
			state.authData = action.payload;
		},
		onLogout: (state: AuthState) => {
			state.isSubscription = false;
			state.isLoggedIn = false;
			state.outletId = '';
			state.authData = {
				user_info: {
					email: '',
					phone: '',
					fullname: '',
					user_uuid: '',
				},
				token: '',
				refresh_token: '',
				expired_at: 0,
			};
		},
		setShowSidebar: (state: AuthState, action: PayloadAction<boolean>) => {
			state.showSidebar = action.payload;
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
	},
});

export const {
	onLogout,
	onLoginSuccess,
	setShowSidebar,
	setRestaurantOutletId,
	setIsSubscription,
} = AuthSlice.actions;

export default AuthSlice.reducer;