import { combineReducers } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import PersistStorage from 'redux-persist/lib/storage'
import auth from './slices/auth'
import transaction from './slices/transaction'
import order from './slices/order'

const persistConfig = {
  key: 'root',
  version: 1,
  whitelist: ['auth'],
  storage: PersistStorage,
}

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    auth,
    transaction,
    order,
  }),
)

export default persistedReducer
