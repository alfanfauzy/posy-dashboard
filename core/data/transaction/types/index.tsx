export enum TransactionStatus {
  WAITING_ORDER = 'WAITING_ORDER',
  WAITING_PAYMENT = 'WAITING_PAYMENT',
  WAITING_FOOD = 'WAITING_FOOD',
  PAID = 'PAID',
  CANCELLED = 'CANCELLED',
}

export interface GetTransactionsDataResponse {
  uuid: string
  restaurant_outlet_uuid: string
  restaurant_outlet_table_uuid: string
  total_pax: number
  total_order: number
  price_base: number
  price_tax: number
  price_discount: number
  price_after_discount: number
  price_final: number
  status: TransactionStatus
  transaction_code: string
  session_suffix: string
  transaction_category: string
  customer_name: string
  customer_phone: string
  customer_email: string
  created_at: {
    seconds: number
    nanos: number
  }
  updated_at: {
    seconds: number
    nanos: number
  }
  first_order_at: {
    seconds: number
  }
  paid_at: {
    seconds: number
  }
  is_open: boolean
  is_order: boolean
  is_paid: boolean
  staff: string
  table_number: string
  table_uuid: string
}

export interface GetTransactionDataResponse
  extends GetTransactionsDataResponse {
  test: string
}
