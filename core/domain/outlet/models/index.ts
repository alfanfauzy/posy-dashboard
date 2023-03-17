interface Restaurant {
  uuid: string
  restaurant_code: string
  restaurant_name: string
  restaurant_description: string
}

interface OutletBased {
  uuid: string
  outlet_name: string
  outlet_code: string
  is_default: boolean
  created_at: number
  updated_at: number
  restaurant: Restaurant
}

export type Outlets = OutletBased[]

export type Outlet = OutletBased

export type OutletSelection = Pick<
  OutletBased,
  'uuid' | 'outlet_name' | 'outlet_code'
>[]
