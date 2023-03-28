import { QrCode } from '@/domain/qr-code/model'
import {
  Transaction,
  Transactions,
  TransactionSummary,
} from '@/domain/transaction/model'
import { FilterBased, InputVariables } from '@/domain/vo/BaseInput'
import { Pagination } from '@/domain/vo/BasePagination'
import { ResultMutation, ResultQuery } from '@/domain/vo/BaseResponse'

/**
 * GET
 */

export type GetTransactionsInput = InputVariables<
  keyof Transaction,
  | keyof Pick<
      Transaction,
      'customer_name' | 'status' | 'transaction_code' | 'created_at'
    >
  | keyof FilterBased
>

export type GetTransactionsResult = ResultQuery<Transactions | undefined> & {
  pagination: Pagination | undefined
}

export type GetTransactionInput = { transaction_uuid: string }
export type GetTransactionResult = ResultQuery<Transaction | undefined>

export type GetTransactionSummaryInput = { restaurant_outlet_uuid: string }
export type GetTransactionSummaryResult = ResultQuery<
  TransactionSummary | undefined
>

/**
 * CREATE
 */

export type CreateTransactionInput = { restaurant_outlet_uuid: string }

export type CreateTransactionResult = ResultMutation<QrCode | undefined>

export interface CreateTransactionRepository extends CreateTransactionResult {
  createTransaction(input: CreateTransactionInput): void
}

/**
 * UPDATE
 */

export type UpdateTransactionInput = {
  restaurant_outlet_table_uuid: string
  transaction_category: number
  total_pax: number
  customer_name: string
  transaction_uuid: string
}

export type UpdateTransactionResult = ResultMutation<
  { uuid: string; updated_at: number } | undefined
>

export interface UpdateTransactionRepository extends UpdateTransactionResult {
  updateTransaction(input: UpdateTransactionInput): void
}
