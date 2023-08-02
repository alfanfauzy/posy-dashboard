import {combineReducers} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import PersistStorage from 'redux-persist/lib/storage';

import area from './slices/area';
import auth from './slices/auth';
import generalSettings from './slices/general-settings';
import modal from './slices/modal';
import order from './slices/order';
import product from './slices/product';
import table from './slices/table';
import transaction from './slices/transaction';

const persistConfig = {
	key: 'root',
	version: 1,
	whitelist: ['auth', 'transaction', 'general-settings'],
	storage: PersistStorage,
};

const persistedReducer = persistReducer(
	persistConfig,
	combineReducers({
		auth,
		transaction,
		order,
		modal,
		product,
		area,
		table,
		generalSettings,
	}),
);

export default persistedReducer;
