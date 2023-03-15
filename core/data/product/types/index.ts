interface Category {
  uuid: string
  category_name: string
  is_active: boolean
}

interface AddonVariant {
  uuid: string
  variant_name: string
  variant_priority: number
  variant_price?: number
}

interface Addon {
  uuid: string
  addon_name: string
  is_optional: boolean
  can_choose_multiple: boolean
  min_variant: number
  max_variant: number
  variants: AddonVariant[]
}

interface ProductResponse {
  uuid: string
  product_name: string
  product_description: string
  product_image_url: string
  is_favourite: boolean
  is_discount: boolean
  is_available: boolean
  price: number
  price_discount: number
  price_after_discount: number
  price_discount_percentage: number
  price_final: number
  cooking_duration: number
  categories: Category[] | null
}

interface GetProductsDataResponseBased {
  category_uuid: string
  category_name: string
  products: ProductResponse[]
}

export type GetProductsDataResponse = GetProductsDataResponseBased

export type GetProductDataResponse = {
  detail: {
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
    product: ProductResponse
  }
  addons: Addon[]
}