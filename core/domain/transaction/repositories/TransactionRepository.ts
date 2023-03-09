import { QrCode } from '@/domain/qr-code/model'
import { Transaction, Transactions } from '@/domain/transaction/model'
import { InputVariables } from '@/domain/vo/BaseInput'
import { Pagination } from '@/domain/vo/BasePagination'
import { ResultMutation, ResultQuery } from '@/domain/vo/BaseResponse'

/**
 * GET
 */

export type GetTransactionsInput = InputVariables<
  keyof Transaction,
  keyof Pick<Transaction, 'customer_name' | 'status' | 'transaction_code'>
>

export type GetTransactionsResult = ResultQuery<Transactions | undefined> & {
  pagination: Pagination | undefined
}

export type GetTransactionInput = { transaction_uuid: string }
export type GetTransactionResult = ResultQuery<Transaction | undefined>

/**
 * CREATE
 */

export type CreateTransactionResult = ResultMutation<QrCode | undefined>

export interface CreateTransactionRepository extends CreateTransactionResult {
  createTransaction(): void
}

/**
 * DELETE
 */

export type DeleteTransactionInput = {
  id: string
}

export type DeleteTransactionResult = ResultMutation<Transaction>

export interface DeleteTransactionRepository {
  deleteTransaction(
    input: DeleteTransactionInput,
  ): Promise<DeleteTransactionResult>
}
