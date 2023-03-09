export interface CategoryBased {
  uuid: string
  category_name: string
  is_active: boolean
  category_image?: string
  restaurant_uuid?: string
}

export type Category = CategoryBased

export type Categories = CategoryBased[]
