interface TableBased {
  uuid: string
  restaurant_outlet_uuid: string
  table_number: string
  priority: number
  created_at: number
  updated_at: number
}

export type Tables = TableBased[]
export type Table = TableBased
