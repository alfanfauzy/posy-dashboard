import {configureStore} from '@reduxjs/toolkit';
import {createWrapper} from 'next-redux-wrapper';
import logger from 'redux-logger';
import {
	FLUSH,
	PAUSE,
	PERSIST,
	persistStore,
	PURGE,
	REGISTER,
	REHYDRATE,
} from 'redux-persist';

import persistedReducer from './reducers';

export const store = configureStore({
	reducer: persistedReducer,
	middleware: getDefaultMiddleware => {
		const middleware = getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		});

		if (process.env.NODE_ENV === 'development')
			return middleware.concat(logger);

		return middleware;
	},
});

const persistor = persistStore(store, null, () => store.getState());

const makeStore = () => store;
const wrapper = createWrapper(makeStore);

export {persistor, wrapper};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
