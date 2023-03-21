import { Product, Products } from '@/domain/product/model'
import { FilterBased, InputVariables } from '@/domain/vo/BaseInput'
import { Metadata } from '@/domain/vo/BaseMetadata'
import { Pagination } from '@/domain/vo/BasePagination'
import { ResultMutation, ResultQuery } from '@/domain/vo/BaseResponse'

/**
 * GET
 */

export type GetMenuProductsInput = InputVariables<
  keyof Metadata,
  keyof Pick<Product, 'product_name'>
> & { restaurant_outlet_uuid: string }

export type GetMenuProductsResult = ResultQuery<Products | undefined> & {
  pagination: Pagination | undefined
}

export type GetOutletProductsInput = InputVariables<
  keyof Metadata,
  keyof Pick<Product, 'product_name'> | keyof FilterBased
>

export type GetOutletProductsResult = ResultQuery<Products | undefined> & {
  pagination: Pagination | undefined
}

export type GetMenuProductInput = {
  product_uuid: string
  restaurant_outlet_uuid: string
}

export type GetMenuProductResult = ResultQuery<Product | undefined>

/**
 * UPDATE
 */

export type UpdateOutletProductStatusInput = {
  restaurant_outlet_uuid: string
  status: 'is_show' | 'is_available'
  flag: boolean
  product_uuids: string[]
}

export type UpdateOutletProductStatusResult = ResultMutation<
  | {
      success: boolean
      metadata: Metadata
    }
  | undefined
>

export interface UpdateOutletProductStatusRepository
  extends UpdateOutletProductStatusResult {
  updateOutletProductStatus(input: UpdateOutletProductStatusInput): void
}
