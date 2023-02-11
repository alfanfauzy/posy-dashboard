/**
 *
 * Transaction reducer
 *
 */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface TransactionState {
  search: string
}

const initialState: TransactionState = {
  search: '',
}

export const TransactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    onChangeSearch: (
      state,
      action: PayloadAction<{ search: string; menus: any[] }>,
    ) => {
      const { search } = action.payload
      //   const regex = new RegExp(search, 'i')
      //   const filteredMenu = menus
      //     .flatMap((el) => el.product)
      //     .filter(({ product_name }) => product_name.match(regex))
      //   state.filteredMenu = filteredMenu
      state.search = search
    },
    onClearSearch: (state) => {
      state.search = ''
    },
  },
})

// export the action from the slice
export const { onChangeSearch, onClearSearch } = TransactionSlice.actions

export default TransactionSlice.reducer
