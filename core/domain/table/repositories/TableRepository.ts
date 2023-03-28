/**
 * GET
 */

import { Table, Tables } from '@/domain/table/model'
import { FilterBased, InputVariables } from '@/domain/vo/BaseInput'
import { Pagination } from '@/domain/vo/BasePagination'
import { ResultQuery } from '@/domain/vo/BaseResponse'

export type GetTablesInput = InputVariables<
  keyof Pick<Table, 'priority'>,
  keyof Pick<Table, 'table_number'> | keyof FilterBased
>

export type GetTablesResult = ResultQuery<Tables | undefined> & {
  pagination: Pagination | undefined
}
