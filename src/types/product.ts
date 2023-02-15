export interface Variant {
  variant_uuid: string
  variant_name: string
  price: number
}

export interface Addon {
  addon_uuid: string
  addon_name: string
  is_multiple: boolean
  variant: Variant[]
}

export interface Product {
  product_uuid: string
  product_name: string
  product_thumbnail?: string
  product_description: string
  is_favourite: boolean
  is_discount: boolean
  price_before_discount: number
  price_after_discount: number
  is_available: boolean
  cooking_duration: number
  addon: Addon[]
}
