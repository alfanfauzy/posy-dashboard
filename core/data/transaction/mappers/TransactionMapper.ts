import { QrCode } from '@/domain/qr-code/models'
import { Transaction, Transactions } from '@/domain/transaction/models'

import {
  CreateTransactionDataResponse,
  GetTransactionDataResponse,
  GetTransactionsDataResponse,
} from '../types'

// map server data to own model
export const mapToTransactionsModel = (
  datas: GetTransactionsDataResponse[],
): Transactions =>
  datas.map((data) => ({
    uuid: data.uuid,
    created_at: data.created_at.seconds,
    paid_at: data.paid_at.seconds,
    first_order_at: data.first_order_at.seconds,
    updated_at: data.updated_at.seconds,
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

export const mapToTransactionModel = (
  data: GetTransactionDataResponse,
): Transaction => ({
  uuid: data.uuid,
  created_at: data.created_at.seconds,
  paid_at: data.paid_at.seconds,
  first_order_at: data.first_order_at.seconds,
  updated_at: data.updated_at.seconds,
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
})

export const mapToCreateTransactionModel = (
  data: CreateTransactionDataResponse,
): QrCode => ({
  uuid: data.uuid,
  base64_qrcode: data.qrcode.base64_qrcode,
  qrcode_url: data.qrcode.qrcode_url,
  transaction_code: data.qrcode.transaction_code,
  nanos: data.created_at.nanos,
  seconds: data.created_at.seconds,
})
