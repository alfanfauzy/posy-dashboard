import { Transaction } from '@/domain/transaction/models'
import { InputVariables } from '@/domain/vo/BaseInput'
import { Result } from '@/domain/vo/BaseResponse'

/**
 * GET
 */

export type GetTransactionsInput = InputVariables<
  keyof Transaction,
  keyof Pick<Transaction, 'customer_name' | 'transaction_code'>
>

type Pagination = {
  curr_page: number
  total_page: number
  total_objs: number
  per_page: number
}

export type GetTransactionsResult = Result<Transaction[] | undefined> & {
  pagination: Pagination | undefined
}

export type GetTransactionResult = Result<Transaction>

/**
 * CREATE
 */

export type CreateTransactionInput = {
  id: string
}

export type CreateTransactionResult = Result<Transaction>

export interface CreateTransactionRepository {
  createTransaction(
    input: CreateTransactionInput,
  ): Promise<CreateTransactionResult>
}

/**
 * DELETE
 */

export type DeleteTransactionInput = {
  id: string
}

export type DeleteTransactionResult = Result<Transaction>

export interface DeleteTransactionRepository {
  deleteTransaction(
    input: DeleteTransactionInput,
  ): Promise<DeleteTransactionResult>
}
