import { Orders } from '@/domain/order/model'
import { Metadata } from '@/domain/vo/BaseMetadata'
import { ResultMutation, ResultQuery } from '@/domain/vo/BaseResponse'

/**
 * GET
 */

export type GetOrdersInput = { transaction_uuid: string }

export type GetOrdersResult = ResultQuery<Orders | undefined>

// export type GetOrderInput = { product_uuid: string }
// export type GetOrderResult = ResultQuery<Order | undefined>

/**
 * CREATE
 */

type AddOnInput = {
  uuid: string
}

type Orderinput = {
  product_uuid: string
  qty: number
  order_note?: string
  addon?: AddOnInput[]
}

export type CreateOrderManualInput = {
  transaction_uuid: string
  restaurant_outlet_uuid: string
  order: Orderinput[]
}

export type CreateOrderManualResult = ResultMutation<
  { uuid: string; metadata: Metadata } | undefined
>

export interface CreateOrderManualRepository extends CreateOrderManualResult {
  createOrderManual(input: CreateOrderManualInput): void
}
