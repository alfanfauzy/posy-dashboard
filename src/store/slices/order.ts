/**
 *
 * Order reducer
 *
 */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { Product } from '@/types/product'

export type AddOnVariant = {
  addOnName: string
  addOnUuid: string
  variant_name: string
  variant_uuid: string
  price: number
}

export interface OrderItem {
  order_uuid: number
  product: Partial<Product>
  quantity: number
  addOnVariant: AddOnVariant[]
  notes?: string
}

export interface OrderState {
  orderForm: {
    product: Partial<Product>
    quantity: number
    addOnVariant: AddOnVariant[]
    notes?: string
  }
  order: OrderItem[]
}

const initialState: OrderState = {
  orderForm: {
    product: {},
    quantity: 0,
    addOnVariant: [],
  },
  order: [],
}

export const OrderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    onChangeProduct: (
      state,
      action: PayloadAction<{ product: Partial<Product> }>,
    ) => {
      state.orderForm.product = action.payload.product
    },
    onChangeNotes: (state, action: PayloadAction<string>) => {
      state.orderForm.notes = action.payload
      state.orderForm.notes = action.payload
      state.orderForm.notes = action.payload
    },
    onChangeQuantity: (
      state,
      action: PayloadAction<{ operator: 'plus' | 'minus'; value: number }>,
    ) => {
      switch (action.payload.operator) {
        case 'plus':
          state.orderForm.quantity += action.payload.value
          break
        case 'minus':
          state.orderForm.quantity -= action.payload.value
          break
        default:
          break
      }
    },
    onCloseOrderModal: (state) => {
      state.orderForm.quantity = 0
      state.orderForm.notes = ''
      state.orderForm.addOnVariant = []
      state.orderForm.product = {}
    },
    onChangeAddOn: (
      state,
      action: PayloadAction<{
        type: 'radio' | 'checkbox'
        addOnVariant: AddOnVariant
      }>,
    ) => {
      const { addOnVariant } = action.payload
      const prevAddOnVariant = state.orderForm.addOnVariant

      switch (action.payload.type) {
        case 'radio':
          if (
            prevAddOnVariant.find(
              (el) => el.addOnUuid === addOnVariant.addOnUuid,
            )
          ) {
            const filteredArr = prevAddOnVariant.filter(
              (el) => el.addOnUuid !== addOnVariant.addOnUuid,
            )
            filteredArr.push(addOnVariant)
            state.orderForm.addOnVariant = filteredArr
          }

          prevAddOnVariant.push(addOnVariant)
          break
        case 'checkbox':
          if (
            prevAddOnVariant.find(
              (el) => el.variant_uuid === addOnVariant.variant_uuid,
            )
          ) {
            const filteredArr = prevAddOnVariant.filter(
              (el) => el.variant_uuid !== addOnVariant.variant_uuid,
            )
            state.orderForm.addOnVariant = filteredArr
          }
          prevAddOnVariant.push(addOnVariant)
          break
        default:
          break
      }
    },
    onAddOrder: (state, action: PayloadAction<OrderItem>) => {
      state.order.push(action.payload)
    },
    onDropOrder: (state, action: PayloadAction<{ order_uuid: number }>) => {
      const prevOrder = state.order
      const filteredOrder = prevOrder.filter(
        (el) => el.order_uuid !== action.payload.order_uuid,
      )
      state.order = filteredOrder
    },
  },
})

// export the action from the slice
export const {
  onChangeNotes,
  onChangeQuantity,
  onCloseOrderModal,
  onChangeProduct,
  onChangeAddOn,
  onAddOrder,
  onDropOrder,
} = OrderSlice.actions

export default OrderSlice.reducer
