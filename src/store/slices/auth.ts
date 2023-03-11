/**
 *
 * Auth reducer
 *
 */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Login } from '@/domain/auth/model'

export interface AuthState {
  isLoggedIn: boolean
  authData: Login
  showSidebar: boolean
}

const initialState: AuthState = {
  isLoggedIn: false,
  authData: {
    uuid: '',
    token: '',
    refresh_token: '',
    expired_at: 0,
  },
  showSidebar: false,
}

export const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    onLoginSuccess: (state: AuthState, action: PayloadAction<Login>) => {
      state.isLoggedIn = true
      state.authData = action.payload
    },
    onLogout: (state: AuthState) => {
      state.isLoggedIn = false
      state.authData = {
        uuid: '',
        token: '',
        refresh_token: '',
        expired_at: 0,
      }
    },
    setShowSidebar: (state: AuthState, action: PayloadAction<boolean>) => {
      state.showSidebar = action.payload
    },
  },
})

// export the action from the slice
export const { onLoginSuccess, onLogout, setShowSidebar } = AuthSlice.actions

export default AuthSlice.reducer
