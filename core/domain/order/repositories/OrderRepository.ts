import { Order, Orders } from '@/domain/order/model'
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

export type CreateOrderManualResult = ResultMutation<Order | undefined>

export interface CreateOrderManualRepository extends CreateOrderManualResult {
  createOrderManual(): void
}
