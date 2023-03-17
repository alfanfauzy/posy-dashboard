import { CreatedAt, UpdatedAt } from '@/data/common/types/metadata'

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
  created_at: CreatedAt
  updated_at: UpdatedAt
  restaurant: Restaurant
}

export type GetOutletSelectionDataResponse = OutletBased
