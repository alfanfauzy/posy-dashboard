/* eslint-disable @typescript-eslint/no-var-requires */
import { combineReducers } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
// import PersistStorage from 'redux-persist/lib/storage'
import auth from './slices/auth'

const storage = require('redux-persist/lib/storage').default

const persistConfig = {
  key: 'root',
  version: 1,
  whiteList: ['auth'],
  storage,
}

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    auth,
  }),
)

export default persistedReducer
