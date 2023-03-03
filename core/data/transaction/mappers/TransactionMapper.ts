import { Transaction } from '@/domain/transaction/models'

import { GetTransactionsDataResponse } from '../types'

// map server data to own model
export const mapToTransactionsModel = (
  datas: GetTransactionsDataResponse[],
): Transaction[] =>
  datas.map((data) => ({
    uuid: data.uuid,
    created_at: data.created_at,
    customer_name: data.customer_name,
    is_open: data.is_open,
    is_order: data.is_order,
    is_paid: data.is_paid,
    staff: data.staff,
    status: data.status,
    table_number: data.table_number,
    table_uuid: data.table_uuid,
    total_order: data.total_order,
    total_pax: data.total_pax,
    transaction_code: data.transaction_code,
  }))

// export const mapToTransactionModel = (
//   data: GetTransactionDataResponse,
// ): GetTransactionDataResponse => ({
//   ...mapToTransactionsModel(data),
//   test: data.test,
// })
