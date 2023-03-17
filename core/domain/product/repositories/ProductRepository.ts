import { Product, Products } from '@/domain/product/model'
import { InputVariables } from '@/domain/vo/BaseInput'
import { Metadata } from '@/domain/vo/BaseMetadata'
import { Pagination } from '@/domain/vo/BasePagination'
import { ResultQuery } from '@/domain/vo/BaseResponse'

/**
 * GET
 */

export type GetProductsInput = InputVariables<
  keyof Metadata,
  keyof Pick<Product, 'product_name'>
> & { restaurant_outlet_uuid: string }

export type GetProductsResult = ResultQuery<Products | undefined> & {
  pagination: Pagination | undefined
}

export type GetProductInput = { product_uuid: string }

export type GetProductResult = ResultQuery<Product | undefined>

/**
 * CREATE
 */

// export type CreateTransactionResult = ResultMutation<QrCode | undefined>

// export interface CreateTransactionRepository extends CreateTransactionResult {
//   createTransaction(): void
// }
