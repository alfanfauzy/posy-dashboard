import { Metadata, UpdatedAt } from '@/data/common/types/metadata'
import { Category } from '@/domain/category/model'

export interface Product {
  uuid: string
  restaurant_uuid: string
  product_name: string
  product_description: string
  product_image: string
  product_image_url: string
  categories: Category[]
}

interface OutletProductBased {
  product: Product
  is_show: boolean
  is_available: boolean
  is_discount: boolean
  is_favourite: boolean
  price: number
  price_discount: number
  price_after_discount: number
  price_discount_percentage: number
  price_final: number
  cooking_duration: number
  metadata: Metadata
}

export type GetOutletProductsDataResponse = OutletProductBased

export type UpdateOutletProductStatusDataResponse = {
  success: boolean
  metadata: {
    updated_at: UpdatedAt
  }
}
