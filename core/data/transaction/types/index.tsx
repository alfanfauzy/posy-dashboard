export enum TransactionStatus {
  WAITING_ORDER = 'WAITING_ORDER',
  WAITING_PAYMENT = 'WAITING_PAYMENT',
  WAITING_FOOD = 'WAITING_FOOD',
  PAID = 'PAID',
  CANCELLED = 'CANCELLED',
}

export interface GetTransactionsDataResponse {
  uuid: string
  transaction_code: string
  table_uuid: string
  table_number: string
  total_pax: number
  total_order: number
  status: TransactionStatus
  is_open: boolean
  is_order: boolean
  is_paid: boolean
  created_at: {
    seconds: number
    nanos: number
  }
  customer_name: string
  staff: string
}

export interface GetTransactionDataResponse
  extends GetTransactionsDataResponse {
  test: string
}
