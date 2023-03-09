import { Metadata } from '@/data/common/types/metadata'

export interface Category {
  uuid: string
  category_name: string
  is_active: boolean
}

interface GetProductsDataResponseBased {
  product: {
    uuid: string
    restaurant_uuid: string
    product_name: string
    product_description: string
    product_image: string
    product_image_url: string
    categories: Category[]
  }
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

export type GetProductsDataResponse = GetProductsDataResponseBased
