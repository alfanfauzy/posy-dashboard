export type SortingType = 'desc' | 'asc'

export type FilterBased = {
  keyword: string
  restaurant_outlet_uuid: string
}

export type Sort<TField = unknown> = {
  field: TField
  value: SortingType
}

export type Search<TField = unknown> = {
  field: TField
  value: string
}

export interface InputVariables<TSort = unknown, TSearch = unknown> {
  sort?: Sort<TSort>
  search?: Search<TSearch>[]
  limit?: number
  page?: number
}
