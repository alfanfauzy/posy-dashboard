/**
 *
 * Auth reducer
 *
 */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthData {
  uuid: string
  token: string
  refresh_token: string
  expired_at: {
    seconds: number
    nanos: number
  }
}

export interface AuthState {
  isLoggedIn: boolean
  authData: AuthData
  showSidebar: boolean
}

const initialState: AuthState = {
  isLoggedIn: false,
  authData: {
    uuid: '',
    token: '',
    refresh_token: '',
    expired_at: {
      seconds: 0,
      nanos: 0,
    },
  },
  showSidebar: false,
}

export const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authSuccess: (state: AuthState, action: PayloadAction<AuthData>) => {
      state.isLoggedIn = true
      state.authData = action.payload
    },
    onLogout: (state: AuthState) => {
      state.isLoggedIn = false
      state.authData = {
        uuid: '',
        token: '',
        refresh_token: '',
        expired_at: {
          seconds: 0,
          nanos: 0,
        },
      }
    },
    setShowSidebar: (state: AuthState, action: PayloadAction<boolean>) => {
      state.showSidebar = action.payload
    },
  },
})

// export the action from the slice
export const { authSuccess, onLogout, setShowSidebar } = AuthSlice.actions

export default AuthSlice.reducer
