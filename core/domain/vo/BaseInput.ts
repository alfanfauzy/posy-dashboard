export type SortingType = 'desc' | 'asc'

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

// export type TransactionDataResponse = {
//   transaction_code: string
//   transaction_name: string
// }

// // use case
// export type TransactionDataSearchKey = keyof TransactionDataResponse
// export type TransactionDataSortKey = keyof Pick<
//   TransactionDataResponse,
//   'transaction_name'
// >

// const input: InputVariables<TransactionDataSortKey, TransactionDataSearchKey> =
//   {
//     search: [{ field: 'transaction_name', value: 'test' }],
//     sort: {
//       field: 'transaction_name',
//       value: 'asc',
//     },
//   }
