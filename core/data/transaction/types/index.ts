import { UpdatedAt } from '@/data/common/types/metadata'
import { Order } from '@/domain/order/model'

export enum TransactionStatus {
  WAITING_ORDER = 'WAITING_ORDER',
  WAITING_PAYMENT = 'WAITING_PAYMENT',
  WAITING_FOOD = 'WAITING_FOOD',
  PAID = 'PAID',
  CANCELLED = 'CANCELLED',
}

interface GetTransactionsDataResponseBased {
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
}

export type GetTransactionsDataResponse = GetTransactionsDataResponseBased

export interface GetTransactionDataResponse
  extends GetTransactionsDataResponseBased {
  orders?: Order[]
}

export interface CreateTransactionDataResponse {
  uuid: string
  qrcode: {
    base64_qrcode: string
    qrcode_url: string
    transaction_code: string
  }
  created_at: {
    seconds: number
    nanos: number
  }
}

export interface GetTransactionSummaryDataResponse {
  waiting_order: number
  waiting_payment: number
  table_capacity: number
  available_capacity: number
}

export interface UpdateTransactionDataResponse {
  uuid: string
  updated_at: UpdatedAt
}
