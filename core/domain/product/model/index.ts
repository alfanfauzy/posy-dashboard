import { Addons } from '@/domain/addon/model'
import { Categories } from '@/domain/category/model'

interface ProductBased {
  uuid: string
  product_name: string
  product_description: string
  product_image_url: string
  price: number
  price_discount: number
  price_after_discount: number
  price_discount_percentage: number
  price_final: number
  cooking_duration: number
  categories: Categories | null
  is_available: boolean
  is_discount: boolean
  is_favourite: boolean
  is_show: boolean
}

export interface Product extends ProductBased {
  addons?: Addons
}

export type Products = ProductBased[]
