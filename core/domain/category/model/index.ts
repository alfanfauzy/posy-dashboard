interface CategoryBased {
  uuid: string
  category_name: string
  restaurant_uuid: string
  is_active: boolean
}

export type Category = CategoryBased

export type Categories = CategoryBased[]
