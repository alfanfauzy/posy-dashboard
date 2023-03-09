import { Categories } from '@/domain/category/model'
import { Metadata } from '@/domain/vo/BaseMetadata'

interface ProductBased {
  uuid: string
  restaurant_uuid: string
  product_name: string
  product_description: string
  product_image: string
  product_image_url: string
  categories: Categories
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

export type Product = ProductBased

export type Products = ProductBased[]
